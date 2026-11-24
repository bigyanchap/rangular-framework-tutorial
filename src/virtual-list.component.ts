import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * The thousand messages page: lesson 83's virtual
 * scrolling demo on a page of its own. A thousand messages
 * stand behind fifteen rows. The rows are the only views
 * ever created: a slider moves the window over the data,
 * the step buttons move it fifteen at a time, and each
 * row's title and subtitle are computed from the window's
 * start plus the row's slot. Move the window and the same
 * fifteen rows wear new numbers. That reuse is the whole
 * mechanism a virtualised list runs on.
 */
@Component({
  selector: 'app-virtual-list',
  templateUrl: './virtual-list.component.html',
  styles: [`
    .vs-readout { font-size: 14px; line-height: 20px; font-weight: 600; color: #5f6368; }
    .vs-panel { border-width: 1px; border-color: #a06a35; border-radius: 12px; padding: 12px; background-color: #fdf6ec; margin-top: 12px; }
    .vs-nav { flex-direction: row; justify-content: space-between; margin-top: 12px; }
  `],
})
export class VirtualListComponent {
  start = 0;
  firstShown = 1;
  lastShown = 15;
  slots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  senders = ['Ana', 'Ben', 'Cleo', 'Dev', 'Eli', 'Faye', 'Gus', 'Hana'];

  constructor(private router: Router) {}

  pickStart(v: number) {
    this.start = v;
    this.syncShown(v);
  }

  move(d: number) {
    let n = this.start + d;
    if (n < 0) {
      n = 0;
    }
    if (n > 985) {
      n = 985;
    }
    this.start = n;
    this.syncShown(n);
  }

  syncShown(n: number) {
    this.firstShown = n + 1;
    this.lastShown = n + 15;
  }

  rowTitle(s: number) {
    return 'Message ' + (this.start + s + 1);
  }

  rowSub(s: number) {
    return this.senders[(this.start + s) % 8] + ' · message ' + (this.start + s + 1) + ' of 1,000';
  }

  goBack() {
    this.router.navigate(['/lesson', 83]);
  }
}
