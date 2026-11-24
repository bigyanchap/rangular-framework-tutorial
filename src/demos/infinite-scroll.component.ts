import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Lesson 81's live demo launcher: a list that pages needs
 * a whole scrolling surface, so the demo lives on its own
 * page, the way lesson 60's array got a page of its own.
 * The card itself is the tap (his pick, the dressed D2):
 * the page icon in a tint disc, the title and one line, a
 * chevron, and two pills of fact. No button: the whole
 * surface opens the page. The lesson page frames the demo
 * in a bordered box with an ultra light wash (his order,
 * 2026-11-24); the gradient edge the first D2 wore came
 * off, the box does that work now.
 */
@Component({
  selector: 'app-infinite-scroll-demo',
  templateUrl: './infinite-scroll.component.html',
  styles: [`
    .launch { gap: 10px; }
    .launch-row { flex-direction: row; gap: 12px; align-items: center; }
    .launch-icon { width: 42px; height: 42px; border-radius: 9999px; background-color: #e8f0fe; align-items: center; justify-content: center; }
    .launch-text { flex: 1; }
    .launch-title { font-size: 16px; line-height: 22px; font-weight: 700; }
    .launch-sub { font-size: 14px; line-height: 20px; color: #5f6368; }
    .launch-pills { flex-direction: row; gap: 8px; }
    .pill { background-color: #e8f0fe; border-radius: 9999px; padding-left: 10px; padding-right: 10px; padding-top: 4px; padding-bottom: 4px; }
    .pill-text { font-size: 12px; line-height: 16px; font-weight: 600; color: #0b57d0; }
  `],
})
export class InfiniteScrollDemoComponent {
  constructor(private router: Router) {}

  openList() {
    this.router.navigate(['/reading-list', 1]);
  }
}
