import { Injectable } from '@angular/core';

/**
 * The Breakout sample's engine, in a service for the same
 * reason as the platformer before it: the 50 millisecond
 * interval reads and writes this state constantly, and a
 * service's fields are always current. The field is a grid
 * of 24 by 30 cells. Six rows of bricks sit near the top,
 * two cells per brick, each row its own colour; the grid
 * holds a digit per brick cell naming its colour row. The
 * ball flies with simple physics: walls bounce it, the
 * paddle bounces it with angle from where it lands, a
 * brick clears both its cells and scores ten. Three lives;
 * clear the wall to win.
 */
@Injectable({ providedIn: 'root' })
export class BreakoutService {
  rowIdx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
  colIdx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  grid: string[][] = [];
  view: string[][] = [];
  bx = 12;
  by = 26;
  vx = 4.5;
  vy = -11;
  px = 9.5;
  dir = 0;
  score = 0;
  lives = 3;
  bricksLeft = 72;
  state = 'ready';
  stateLine = 'Tap launch to start.';
  timer: any = null;

  start() {
    if (this.timer) return;
    this.buildLevel();
    this.render();
    this.timer = setInterval(() => this.tick(), 50);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  buildLevel() {
    this.grid = this.rowIdx.map((r) =>
      this.colIdx.map((c) => {
        if (r >= 4 && r <= 9) return String(r - 3);
        return ' ';
      }),
    );
    this.bricksLeft = 72;
  }

  resetBall() {
    this.px = 9.5;
    this.bx = this.px + 2.5;
    this.by = 26;
    this.vx = 4.5;
    this.vy = -11;
    this.dir = 0;
  }

  tick() {
    if (this.state !== 'playing' && this.state !== 'ready') return;
    const dt = 0.05;
    if (this.dir !== 0) {
      this.px = this.px + this.dir * 16 * dt;
      if (this.px < 0) this.px = 0;
      if (this.px > 19) this.px = 19;
    }
    if (this.state === 'ready') {
      this.bx = this.px + 2.5;
      this.by = 26;
      this.render();
      return;
    }
    const prevBx = this.bx;
    const prevBy = this.by;
    this.bx = this.bx + this.vx * dt;
    this.by = this.by + this.vy * dt;
    if (this.bx < 0.5) { this.bx = 0.5; this.vx = Math.abs(this.vx); }
    if (this.bx > 22.5) { this.bx = 22.5; this.vx = -Math.abs(this.vx); }
    if (this.by < 0.5) { this.by = 0.5; this.vy = Math.abs(this.vy); }
    if (this.by > 29.5) {
      this.lives = this.lives - 1;
      if (this.lives <= 0) {
        this.state = 'over';
        this.stateLine = 'Game over. Restart and go again.';
      } else {
        this.state = 'ready';
        this.stateLine = 'The ball got past you. ' + this.lives + (this.lives === 1 ? ' life' : ' lives') + ' left. Tap launch.';
        this.resetBall();
      }
      this.render();
      return;
    }
    if (this.vy > 0 && this.by >= 26.3 && this.by <= 27.8 && this.bx >= this.px - 0.5 && this.bx <= this.px + 5.5) {
      this.by = 26.3;
      this.vy = -Math.abs(this.vy);
      const off = (this.bx - (this.px + 2.5)) / 3;
      this.vx = Math.max(-9, Math.min(9, off * 7));
      if (this.vx === 0) this.vx = 2;
    }
    const cc = Math.floor(this.bx);
    const cr = Math.floor(this.by);
    if (cr >= 0 && cr < 30 && cc >= 0 && cc < 24) {
      const ch = this.grid[cr][cc];
      if (ch !== ' ') {
        const c0 = cc - (cc % 2);
        this.grid[cr][c0] = ' ';
        this.grid[cr][c0 + 1] = ' ';
        this.bricksLeft = this.bricksLeft - 1;
        this.score = this.score + 10;
        if (Math.floor(prevBy) !== cr) this.vy = -this.vy;
        else if (Math.floor(prevBx) !== cc) this.vx = -this.vx;
        else this.vy = -this.vy;
        if (this.bricksLeft <= 0) {
          this.state = 'won';
          this.stateLine = 'You cleared the whole wall. Beautiful.';
        }
      }
    }
    this.render();
  }

  render() {
    this.view = this.rowIdx.map((r) =>
      this.colIdx.map((c) => {
        let ch = this.grid[r][c];
        if (r === 27 && c >= Math.floor(this.px) && c <= Math.floor(this.px) + 4) ch = 'P';
        if (Math.floor(this.bx) === c && Math.floor(this.by) === r) ch = 'B';
        return ch;
      }),
    );
  }

  goLeft() {
    this.dir = this.dir === -1 ? 0 : -1;
  }

  goRight() {
    this.dir = this.dir === 1 ? 0 : 1;
  }

  launch() {
    if (this.state === 'ready') {
      this.state = 'playing';
      this.stateLine = 'Clear every brick.';
      this.vy = -11;
      this.vx = this.dir !== 0 ? this.dir * 5 : 4.5;
    }
  }

  restart() {
    this.buildLevel();
    this.score = 0;
    this.lives = 3;
    this.state = 'ready';
    this.stateLine = 'Tap launch to start.';
    this.resetBall();
    this.render();
  }
}
