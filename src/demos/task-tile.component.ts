import { Component } from '@angular/core';

/**
 * Lesson 9's child piece: a small self contained tile. It takes
 * no inputs and keeps its own count, so every place the parent
 * writes its tag is a separate instance with separate state.
 */
@Component({
  selector: 'app-task-tile',
  templateUrl: './task-tile.component.html',
})
export class TaskTileComponent {
  count = 0;

  practise() {
    this.count++;
  }
}
