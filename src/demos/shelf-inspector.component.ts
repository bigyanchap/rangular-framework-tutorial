import { Component } from '@angular/core';
import { ShelfService } from './shelf.service';
import { DeviceKeyComponent } from './device-key.component';

/**
 * Lesson 53's inspector: a separate component that shows the
 * array inside the service, exactly as it is, in a panel at
 * the top of the demo. Its device keys are the demo's two
 * adds. The quiet add also bumps this component's own reads
 * counter, a local assignment, so this component renders
 * again and reads the array fresh: the expansion is visible
 * in the panel at once. The list component below gets no
 * assignment and no local change, so it keeps showing the
 * old shelf until the proper add assigns a new array.
 */
@Component({
  selector: 'app-shelf-inspector',
  templateUrl: './shelf-inspector.component.html',
  styles: [`
    .panel { border-width: 1px; border-color: #a06a35; border-radius: 12px; padding: 12px; background-color: #fdf6ec; }
    .btnrow { flex-direction: row; gap: 8px; }
  `],
})
export class ShelfInspectorComponent {
  reads = 0;

  constructor(private shelf: ShelfService) {}

  itemsText() {
    return this.shelf.items.join(', ');
  }

  quiet() {
    this.shelf.addQuietly('Book');
    this.reads = this.reads + 1;
  }

  proper() {
    this.shelf.addProperly('Book');
    this.reads = this.reads + 1;
  }
}
