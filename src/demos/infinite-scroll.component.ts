import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Lesson 81's live demo launcher: a list that pages needs
 * a whole scrolling surface, so the demo lives on its own
 * page, the way lesson 60's array got a page of its own.
 * This card only explains the idea and opens that page.
 */
@Component({
  selector: 'app-infinite-scroll-demo',
  templateUrl: './infinite-scroll.component.html',
})
export class InfiniteScrollDemoComponent {
  constructor(private router: Router) {}

  openList() {
    this.router.navigate(['/reading-list', 1]);
  }
}
