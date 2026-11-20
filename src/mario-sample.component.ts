import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MarioService } from './mario.service';

/**
 * Sample: a small Mario style platform game. The screen is
 * a thin shell over MarioService: the service holds the
 * level and runs the physics on an interval, this component
 * draws the tiles the service exposes and forwards the
 * device keys. There is no canvas and no game engine: every
 * tile is a section and every frame is a binding update.
 * Tap an arrow key to run that way, tap it again to stop,
 * and jump with the up key.
 */
@Component({
  selector: 'app-mario-sample',
  templateUrl: './mario-sample.component.html',
  styles: [`
    .readout { background-color: #fdf6ec; border-color: #a06a35; border-radius: 16px; padding: 16px; }
    .stage { align-items: center; padding: 8px; }
    .trow { flex-direction: row; justify-content: center; gap: 0px; }
    .cell { width: 17px; height: 17px; }
    .sky { background-color: #bfe3f2; }
    .ground { background-color: #9c6642; }
    .brick { background-color: #c1553b; }
    .qblock { background-color: #e8a91c; }
    .pipe { background-color: #3f9e4d; }
    .plat { background-color: #7a4a21; }
    .coin { background-color: #f5c542; border-radius: 9999px; border-width: 2px; border-color: #b8860b; }
    .pole { background-color: #2e7d32; }
    .flag { background-color: #2e7d32; border-radius: 8px; }
    .enemy { background-color: #6d3b1f; border-radius: 8px; }
    .player { background-color: #d43a2f; border-radius: 8px; }
    .cap { background-color: #8f1d14; height: 5px; border-radius: 8px; }
    .face { background-color: #f2c49b; height: 6px; border-radius: 8px; margin: 4px; }
    .keys-row { flex-direction: row; gap: 8px; justify-content: center; padding: 12px; }
  `],
})
export class MarioSampleComponent {
  constructor(
    public game: MarioService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.game.start();
  }

  ngOnDestroy() {
    this.game.stop();
  }

  goLeft() {
    this.game.goLeft();
  }

  goRight() {
    this.game.goRight();
  }

  jump() {
    this.game.jump();
  }

  restart() {
    this.game.restart();
  }

  goBack() {
    this.router.navigate(['/samples']);
  }
}
