import { Component } from '@angular/core';
import { SnackBar } from '@angular/material/snack-bar';
import { ShelfService } from './shelf.service';
import { DeviceKeyComponent } from './device-key.component';

/**
 * Lesson 53's list: it renders the shelf as the service
 * reports it, the demo's log. It renders again only when the
 * service assigns (the proper add) or when its own local
 * field changes (the Tap key). A quiet add does neither, so
 * this list honestly keeps showing the old shelf. The tap
 * count lives in this component's panel, where a change
 * belongs, not in the key's own label. The proper add's key
 * sits under the list itself (his layout, 2026-11-21): it
 * assigns a new array, so the array panel above and this
 * log both update at once, and its snackbar says so.
 */
@Component({
  selector: 'app-shelf-list',
  templateUrl: './shelf-list.component.html',
  styles: [`
    .panel { border-width: 1px; border-color: #a06a35; border-radius: 12px; padding: 12px; background-color: #fdf6ec; }
    .btnrow { flex-direction: row; gap: 8px; }
  `],
})
export class ShelfListComponent {
  taps = 0;

  constructor(private shelf: ShelfService, private snack: SnackBar) {}

  tap() {
    this.taps = this.taps + 1;
  }

  proper() {
    this.shelf.addProperly('Book');
    this.snack.open('Both the array and the log updated.');
  }
}
