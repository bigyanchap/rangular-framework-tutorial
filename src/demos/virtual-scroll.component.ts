import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Lesson 83's live demo launcher, in the same dress as
 * lesson 81's: the window over a thousand messages needs
 * a whole surface, so the demo lives on its own page and
 * this card only opens it. The whole surface is the tap:
 * the page icon in a tint disc, the title and one line, a
 * chevron, and two pills of fact.
 */
@Component({
  selector: 'app-virtual-scroll-demo',
  templateUrl: './virtual-scroll.component.html',
  styles: [`
    .launch { gap: 8px; }
    .launch-row { flex-direction: row; gap: 12px; align-items: center; }
    .launch-icon { width: 42px; height: 42px; border-radius: 9999px; background-color: #e8f0fe; align-items: center; justify-content: center; }
    .launch-text { flex: 1; }
    .launch-title { font-size: 16px; line-height: 22px; font-weight: 700; }
    .launch-sub { font-size: 14px; line-height: 20px; color: #5f6368; }
    .launch-pills { flex-direction: row; gap: 8px; }
    .pill { background-color: #e8f0fe; border-radius: 9999px; padding-left: 8px; padding-right: 8px; padding-top: 4px; padding-bottom: 4px; }
    .pill-text { font-size: 12px; line-height: 16px; font-weight: 600; color: #0b57d0; }
  `],
})
export class VirtualScrollDemoComponent {
  constructor(private router: Router) {}

  openList() {
    this.router.navigate(['/virtual-list']);
  }
}
