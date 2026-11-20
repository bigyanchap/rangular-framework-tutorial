import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShellService } from './shell.service';

/**
 * The About page: a hero that says what the app is, and
 * short cards with an icon chip each. It is not a tab any
 * more (the Samples tab took the fourth tab slot in the
 * 2026-11-20 overhaul); it lives in the drawer menu, and
 * its bar carries the standard back chevron to Home, like
 * the sample pages.
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: [`
    .hero { background-color: #0b57d0; border-width: 0; border-radius: 16px; padding: 16px; }
    .hero-mark { width: 48px; height: 48px; align-items: center; justify-content: center; }
    .hero-title { color: #ffffff; }
    .hero-text { color: #d3e3fd; }
  `],
})
export class AboutComponent {
  constructor(
    private shell: ShellService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.shell.setPlace('about');
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
