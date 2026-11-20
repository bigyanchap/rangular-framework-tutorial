import { Component } from '@angular/core';
import { SnackBar } from '@angular/material/snack-bar';
import { FavouritesService } from './favourites.service';
import { DeviceKeyComponent } from './device-key.component';

/**
 * Lesson 54's browser: three quotes of its own, listed under
 * a row of device keys, one per quote, under the saved
 * panel. Saving asks the favourites service to keep the
 * quote and confirms with a toast. The browser keeps no
 * list of what was saved.
 */
@Component({
  selector: 'app-quote-browser',
  templateUrl: './quote-browser.component.html',
  styles: [`
    .btnrow { flex-direction: row; gap: 8px; }
  `],
})
export class QuoteBrowserComponent {
  quotes = [
    'Practice is the mother of skill.',
    'What you repeat every day, you become.',
    'Small steps, taken daily, cross the mountain.',
  ];

  constructor(
    private favourites: FavouritesService,
    private snack: SnackBar,
  ) {}

  save(quote: string) {
    this.favourites.save(quote);
    this.snack.open('Saved to your list.');
  }
}
