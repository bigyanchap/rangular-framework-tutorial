import { Component } from '@angular/core';
import { MinutesService } from './minutes.service';

/**
 * Lesson 55's display: the demo's display panel, at the top.
 * It reads the minutes field from the service, and derives
 * the hours text with a method, fresh on every render. The
 * derived text is never stored, so it can never disagree
 * with the minutes: this is the job computed() does in
 * Angular, done the Rangular way.
 */
@Component({
  selector: 'app-minutes-display',
  templateUrl: './minutes-display.component.html',
  styles: [`
    .panel { border-width: 1px; border-color: #a06a35; border-radius: 12px; padding: 12px; background-color: #fdf6ec; }
  `],
})
export class MinutesDisplayComponent {
  constructor(private focus: MinutesService) {}

  hoursText() {
    const m = this.focus.minutes;
    return (m - (m % 60)) / 60 + 'h ' + (m % 60) + 'm';
  }

  stateText() {
    return this.focus.minutes >= 60 ? 'Past an hour of focus.' : 'Under an hour so far.';
  }
}
