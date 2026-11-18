import { Component } from '@angular/core';

/**
 * Lesson 6's live demo: ngFor. The rows come from the items
 * array, one row per item with its index, and the add and
 * remove buttons change the array by assignment, so the list
 * on screen follows the array every time.
 */
@Component({
  selector: 'app-lists-demo',
  templateUrl: './lists.component.html',
})
export class ListsDemoComponent {
  items = ['Morning run', 'Team standup', 'Deep work'];
  private pool = ['Evening walk', 'Reading', 'Write the report', 'Water the plants'];
  private next = 0;

  add() {
    const item = this.pool[this.next % this.pool.length];
    this.next++;
    this.items = [...this.items, item];
  }

  removeLast() {
    this.items = this.items.slice(0, this.items.length - 1);
  }

  clear() {
    this.items = [];
  }
}
