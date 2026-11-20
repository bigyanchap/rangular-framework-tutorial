import { Component } from '@angular/core';
import { ShelfService } from './shelf.service';

/**
 * Lesson 53's list: it renders the shelf as the service
 * reports it. It renders again only when the service assigns
 * (the proper add) or when its own local field changes (the
 * tap button under the list). A quiet add does neither, so
 * this list honestly keeps showing the old shelf.
 */
@Component({
  selector: 'app-shelf-list',
  templateUrl: './shelf-list.component.html',
})
export class ShelfListComponent {
  taps = 0;

  constructor(private shelf: ShelfService) {}

  tap() {
    this.taps = this.taps + 1;
  }
}
