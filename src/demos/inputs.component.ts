import { Component } from '@angular/core';
import { FlowerCardComponent } from './flower-card.component';

/**
 * Lesson 10's live demo: inputs. The garden owns the flower
 * fields and binds them into the flower card. Cycling the
 * flower changes the garden fields, and the card re-renders
 * with the new input values.
 */
@Component({
  selector: 'app-inputs-demo',
  templateUrl: './inputs.component.html',
})
export class InputsDemoComponent {
  private flowers = [
    { name: 'Sunflower', colour: 'gold' },
    { name: 'Rose', colour: 'red' },
    { name: 'Tulip', colour: 'pink' },
  ];
  private index = 0;
  flowerName = 'Sunflower';
  flowerColour = 'gold';

  cycle() {
    this.index = (this.index + 1) % this.flowers.length;
    this.flowerName = this.flowers[this.index].name;
    this.flowerColour = this.flowers[this.index].colour;
  }
}
