import { Component, Input } from '@angular/core';

/**
 * Lesson 10's flower: the flower from lesson 9, grown into
 * a card. It hard codes nothing about itself. The garden
 * hands it a name and a petal colour through its inputs,
 * and the card shows exactly what it was given.
 */
@Component({
  selector: 'app-flower-card',
  templateUrl: './flower-card.component.html',
})
export class FlowerCardComponent {
  @Input() name = '';
  @Input() colour = '';
}
