import { Component } from '@angular/core';

/**
 * The child of lessons 9 to 11: one flower. Lesson 9 plants
 * it three times in the garden and each instance keeps its
 * own bloom count. Lesson 10 grows it into a card that
 * receives a name and a petal colour, and lesson 11 gives
 * it a button that reports a pick to the garden.
 */
@Component({
  selector: 'app-flower',
  templateUrl: './flower.component.html',
})
export class FlowerComponent {
  blooms = 0;

  bloom() {
    this.blooms++;
  }
}
