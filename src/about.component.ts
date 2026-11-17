import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShellService } from './shell.service';

/**
 * The About tab: one title in the bar, a hero that says what
 * the app is, and short cards with an icon chip each. As a tab
 * root it carries no back chevron; the bar's menu opens the
 * drawer, like every tab.
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: [`
    .hero { background-color: #0b57d0; border-width: 0; border-radius: 16px; padding: 16px; }
    .hero-mark { width: 48px; height: 48px; border-radius: 9999px; background-color: #ffffff; align-items: center; justify-content: center; }
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

  openNav() {
    this.shell.openDrawer();
  }

  pickTab(i: number) {
    if (i === 0) this.router.navigate(['/home']);
    else if (i === 1) this.router.navigate(['/saved']);
    else if (i === 2) this.router.navigate(['/progress']);
  }
}
