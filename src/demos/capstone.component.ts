import { Component } from '@angular/core';
import { SnackBar } from '@angular/material/snack-bar';
import { ActivityLogService } from './activity-log.service';

/**
 * Lesson 67's live demo: capstone part 2, the activity log
 * whole. A name from an input, minutes from choice buttons
 * (an input hands you text, and the total needs a number),
 * a gated Add, the shared ActivityLogService underneath, a
 * Remove on every entry, the running total, and a toast when
 * an activity is logged. Entries added in lesson 66 are still
 * here, because the service outlives the screen.
 */
@Component({
  selector: 'app-capstone-demo',
  templateUrl: './capstone.component.html',
})
export class CapstoneDemoComponent {
  name = '';
  minutes = 0;

  constructor(
    private log: ActivityLogService,
    private snack: SnackBar,
  ) {}

  pickMinutes(value: number) {
    this.minutes = value;
  }

  add() {
    this.log.add(this.name, this.minutes);
    this.snack.open('Activity logged');
    this.name = '';
    this.minutes = 0;
  }

  remove(entry: any) {
    this.log.remove(entry);
  }
}
