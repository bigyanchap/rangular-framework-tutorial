import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShellService } from './shell.service';

/**
 * The root shell: one screen, the drawer and the how to dialog
 * above the outlet, and the routed page inside it. The drawer
 * and dialog state lives in the shell service, because every
 * tab page opens the drawer from its own app bar.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    /* doctor: allow-hex - the drawer mark is the deliberate brand blue. */
    .drawer-head { padding: 16px; }
    .drawer-mark { width: 48px; height: 48px; border-radius: 9999px; background-color: #0b57d0; align-items: center; justify-content: center; }
  `],
})
export class AppComponent {
  constructor(
    private shell: ShellService,
    private router: Router,
  ) {}

  closeDrawer() {
    this.shell.closeDrawer();
  }

  openHowTo() {
    this.shell.openHowTo();
  }

  closeHowTo() {
    this.shell.closeHowTo();
  }

  goLearn() {
    this.shell.closeDrawer();
    this.router.navigate(['/home']);
  }

  goSaved() {
    this.shell.closeDrawer();
    this.router.navigate(['/saved']);
  }

  goProgress() {
    this.shell.closeDrawer();
    this.router.navigate(['/progress']);
  }

  goAbout() {
    this.shell.closeDrawer();
    this.router.navigate(['/about']);
  }
}
