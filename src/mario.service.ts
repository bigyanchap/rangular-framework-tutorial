import { Injectable } from '@angular/core';

/**
 * The platformer sample's engine, and the game's whole
 * state: the level grid, the player, the enemies, the score.
 * It lives in a service, not the component, on purpose: the
 * 50 millisecond interval that runs the physics reads and
 * writes this state hundreds of times a minute, and a
 * service is a plain object whose fields are always current,
 * while the component only renders what the service holds
 * and forwards the key presses. The level is eleven strings
 * of tile characters: # ground, B brick, ? question block,
 * P pipe, = platform, o coin, | the flag pole, F the flag.
 * The screen shows an 18 tile window that follows the
 * player. Physics: gravity, jumping, walking enemies, coin
 * pickup, stomping, pits, and the flag.
 */
@Injectable({ providedIn: 'root' })
export class MarioService {
  levelRows: string[] = [
    '                                                                                          ',
    '                                                                                          ',
    '                                                                                     F|   ',
    '                                                     o                                |   ',
    '                               oooo                 ===                               |   ',
    '               B?B         oo     #         oo               BB?BBB    #              |   ',
    '                     ==   ===    ##           PP   =   =               ##             |   ',
    '            PP                  ###       PP  PP              oooo     ###            |   ',
    '            PP                 ####       PP  PP                       ####           |   ',
    '#######################  ###########################   #####################  ############',
    '#######################  ###########################   #####################  ############',
  ];
  rowIdx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  colIdx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  grid: string[][] = [];
  view: string[][] = [];
  px = 2;
  py = 8;
  vy = 0;
  run = 0;
  grounded = true;
  enemies: any[] = [];
  coins = 0;
  lives = 3;
  state = 'playing';
  stateLine = 'Reach the flag.';
  timer: any = null;

  start() {
    if (this.timer) return;
    this.buildLevel();
    this.resetEnemies();
    this.render();
    this.timer = setInterval(() => this.tick(), 50);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  buildLevel() {
    this.grid = this.levelRows.map((r) => r.split(''));
  }

  resetEnemies() {
    this.enemies = [
      { x: 28, min: 26, max: 29, dir: -1, alive: true },
      { x: 44, min: 44, max: 45, dir: 1, alive: true },
      { x: 68, min: 66, max: 69, dir: -1, alive: true },
      { x: 78, min: 78, max: 79, dir: 1, alive: true },
    ];
  }

  solidAt(c: number, r: number) {
    if (c < 0 || c >= 90) return true;
    if (r < 0 || r >= 11) return false;
    const ch = this.grid[r][c];
    return ch === '#' || ch === 'B' || ch === '?' || ch === 'P' || ch === '=';
  }

  boxHitsSolid(x: number, y: number) {
    const c0 = Math.floor(x + 0.05);
    const c1 = Math.floor(x + 0.95);
    const r0 = Math.floor(y + 0.05);
    const r1 = Math.floor(y + 0.95);
    const cols = c1 === c0 ? [c0] : [c0, c1];
    const rows = r1 === r0 ? [r0] : [r0, r1];
    let hit = false;
    cols.forEach((c) => {
      rows.forEach((r) => {
        if (this.solidAt(c, r)) hit = true;
      });
    });
    return hit;
  }

  tick() {
    if (this.state !== 'playing') return;
    const dt = 0.05;
    const vx = this.run * 5.5;
    if (vx !== 0) {
      const nx = this.px + vx * dt;
      if (!this.boxHitsSolid(nx, this.py)) this.px = nx;
    }
    this.vy = Math.min(this.vy + 30 * dt, 18);
    const ny = this.py + this.vy * dt;
    if (this.boxHitsSolid(this.px, ny)) {
      if (this.vy > 0) {
        this.py = Math.floor(ny + 0.95) - 1 + 0.001;
        this.grounded = true;
      } else {
        this.py = Math.floor(ny) + 1;
      }
      this.vy = 0;
    } else {
      this.py = ny;
      this.grounded = this.boxHitsSolid(this.px, this.py + 0.06);
      if (this.grounded) this.vy = 0;
    }
    this.enemies = this.enemies.map((e) => {
      if (!e.alive) return e;
      let x = e.x + e.dir * 2.2 * dt;
      let dir = e.dir;
      if (x < e.min) { x = e.min; dir = 1; }
      if (x > e.max) { x = e.max; dir = -1; }
      return { x, min: e.min, max: e.max, dir, alive: true };
    });
    const cc = Math.floor(this.px + 0.5);
    const cr = Math.floor(this.py + 0.5);
    if (cr >= 0 && cr < 11 && cc >= 0 && cc < 90 && this.grid[cr][cc] === 'o') {
      this.grid[cr][cc] = ' ';
      this.coins = this.coins + 1;
    }
    this.enemies.forEach((e) => {
      if (!e.alive || this.state !== 'playing') return;
      const overlap = this.px + 0.9 > e.x && this.px < e.x + 0.9 && this.py + 0.9 > 8 && this.py < 9;
      if (overlap) {
        if (this.vy > 2 && this.py + 1 <= 8.6) {
          e.alive = false;
          this.vy = -8;
        } else {
          this.die();
        }
      }
    });
    if (this.state !== 'playing') { this.render(); return; }
    if (this.py > 10.4) {
      this.die();
      this.render();
      return;
    }
    if (this.px >= 85.1) {
      this.state = 'won';
      this.stateLine = 'You reached the flag. Level complete.';
    }
    this.render();
  }

  die() {
    this.lives = this.lives - 1;
    if (this.lives <= 0) {
      this.state = 'over';
      this.stateLine = 'Game over. Restart and try again.';
      return;
    }
    this.stateLine = 'Ouch. ' + this.lives + (this.lives === 1 ? ' life' : ' lives') + ' left.';
    this.px = 2;
    this.py = 8;
    this.vy = 0;
    this.run = 0;
    this.resetEnemies();
  }

  render() {
    let cam = Math.floor(this.px) - 6;
    if (cam < 0) cam = 0;
    if (cam > 72) cam = 72;
    this.view = this.rowIdx.map((r) =>
      this.colIdx.map((dc) => {
        const c = cam + dc;
        let ch = this.grid[r][c];
        this.enemies.forEach((e) => {
          if (e.alive && Math.floor(e.x) === c && r === 8) ch = 'E';
        });
        if (Math.floor(this.px) === c && Math.floor(this.py) === r) ch = 'X';
        return ch;
      }),
    );
  }

  goLeft() {
    this.run = this.run === -1 ? 0 : -1;
  }

  goRight() {
    this.run = this.run === 1 ? 0 : 1;
  }

  jump() {
    if (this.state === 'playing' && this.grounded) {
      this.vy = -15;
      this.grounded = false;
    }
  }

  restart() {
    this.buildLevel();
    this.resetEnemies();
    this.px = 2;
    this.py = 8;
    this.vy = 0;
    this.run = 0;
    this.coins = 0;
    this.lives = 3;
    this.state = 'playing';
    this.stateLine = 'Reach the flag.';
    this.render();
  }
}
