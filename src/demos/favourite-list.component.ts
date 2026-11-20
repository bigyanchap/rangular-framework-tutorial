import { Component } from '@angular/core';
import { FavouritesService } from './favourites.service';

/**
 * Lesson 54's saved list, now the demo's display panel: it
 * sits at the top of the demo and reads only the favourites
 * service. What the browser saved appears here the moment it
 * is saved, because the service is the one source of truth
 * for both.
 */
@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styles: [`
    .panel { border-width: 1px; border-color: #a06a35; border-radius: 12px; padding: 12px; background-color: #fdf6ec; }
  `],
})
export class FavouriteListComponent {
  constructor(private favourites: FavouritesService) {}

  clear() {
    this.favourites.clear();
  }
}
