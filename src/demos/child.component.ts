import { Component } from '@angular/core';
import { TaskTileComponent } from './task-tile.component';

/**
 * Lesson 9's live demo: child components. The same task
 * tile tag is written three times, and each tile is its own
 * instance with its own count, so tapping one moves only one.
 */
@Component({
  selector: 'app-child-demo',
  templateUrl: './child.component.html',
})
export class ChildDemoComponent {}
