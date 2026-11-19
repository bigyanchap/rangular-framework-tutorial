import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Lesson 11's flower: the card from lesson 10, with one new
 * power. It still receives its name through an input, and
 * now it also reports a pick through its picked output,
 * emitting its own name as the value.
 */
@Component({
  selector: 'app-flower-pick',
  templateUrl: './flower-pick.component.html',
})
export class FlowerPickComponent {
  @Input() name = '';
  @Output() picked = new EventEmitter<string>();

  pick() {
    this.picked.emit(this.name);
  }
}
