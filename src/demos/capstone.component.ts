import { Component } from '@angular/core';
import { SnackBar } from '@angular/material/snack-bar';
import { ActivityLogService } from './activity-log.service';

/**
 * Lesson 67's live demo: capstone part 2, the activity log
 * whole. A name from an input, minutes from choice buttons
 * (an input hands you text, and the total needs a number),
 * a gated Add, the shared ActivityLogService underneath, a
 * Remove on every entry, the running total, and a toast when
 * an activity is logged. The log sits in a panel at the top
 * of the demo, so every add and remove shows at once, and
 * the form sits under it. Entries added in lesson 66 are still
 * here, because the service outlives the screen.
 */
@Component({
  selector: 'app-capstone-demo',
  templateUrl: './capstone.component.html',
  styles: [`
    .panel { border-width: 1px; border-color: #a06a35; border-radius: 12px; padding: 12px; background-color: #fdf6ec; }
    .btnrow { flex-direction: row; gap: 8px; }
    .sq { width: 72px; height: 72px; border-radius: 16px; }
  `],
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
