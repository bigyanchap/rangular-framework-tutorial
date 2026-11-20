import { Component } from '@angular/core';
import { ShelfInspectorComponent } from './shelf-inspector.component';
import { ShelfListComponent } from './shelf-list.component';

/**
 * Lesson 53's live demo: the reactivity contract. The shelf
 * lives in a service. The inspector panel at the top shows
 * the array itself and carries the two adds; the list below
 * renders the shelf only when it is told. A quiet add grows
 * the array in the panel while the list does not move; a
 * local change in the list component then renders it, and
 * the book appears, because it was in the data all along.
 * The proper add assigns, and the list moves at once.
 */
@Component({
  selector: 'app-reactivity-demo',
  templateUrl: './reactivity.component.html',
})
export class ReactivityDemoComponent {}
