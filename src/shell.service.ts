import { Injectable } from '@angular/core';

/**
 * The shell's shared state: the drawer and the how to dialog
 * live in the root component, above every route, and every tab
 * page opens the drawer from its own app bar menu. The place
 * names the tab the reader is on, so the drawer can mark its
 * current row. State changes by assignment, like everywhere in
 * this app.
 */
@Injectable({ providedIn: 'root' })
export class ShellService {
  drawerOpen = false;
  howToOpen = false;
  place = 'learn';

  openDrawer() {
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  openHowTo() {
    this.drawerOpen = false;
    this.howToOpen = true;
  }

  closeHowTo() {
    this.howToOpen = false;
  }

  setPlace(place: string) {
    this.place = place;
  }
}
