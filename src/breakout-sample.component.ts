import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakoutService } from './breakout.service';

/**
 * Sample: Atari Breakout. A dark arcade stage, six rows of
 * shiny bricks (each brick carries a gloss strip, the way
 * the device keys carry a face), a paddle worked by the
 * device keys, and a ball with real bounce physics, all of
 * it bindings over a grid the BreakoutService updates every
 * 50 milliseconds. No canvas, no game engine.
 */
@Component({
  selector: 'app-breakout-sample',
  templateUrl: './breakout-sample.component.html',
  styles: [`
    .readout { background-color: #fdf6ec; border-color: #a06a35; border-radius: 16px; padding: 16px; }
    .stage { background-color: #171d33; border-radius: 16px; padding: 8px; align-items: center; gap: 0px; }
    .trow { flex-direction: row; justify-content: center; gap: 0px; }
    .cell { width: 13px; height: 13px; }
    .b1 { background-color: #e5484d; }
    .b2 { background-color: #f76b15; }
    .b3 { background-color: #ffd60a; }
    .b4 { background-color: #46a758; }
    .b5 { background-color: #3e9bff; }
    .b6 { background-color: #8e4ec6; }
    .gloss { height: 6px; background-color: #ffffff; opacity: 0.35; }
    .ball { background-color: #ffffff; border-radius: 9999px; }
    .paddle { background-color: #f5c542; border-radius: 9999px; }
    .keys-row { flex-direction: row; gap: 8px; justify-content: center; padding: 12px; }
  `],
})
export class BreakoutSampleComponent {
  constructor(
    public game: BreakoutService,
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

  launch() {
    this.game.launch();
  }

  restart() {
    this.game.restart();
  }

  goBack() {
    this.router.navigate(['/samples']);
  }
}
