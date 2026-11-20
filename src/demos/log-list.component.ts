import { Component } from '@angular/core';
import { ActivityLogService } from './activity-log.service';

/**
 * Capstone part 1's list, now the demo's display panel at
 * the top: it only reads the log service, the entries, the
 * count and the running total, and shows an empty state
 * until the first activity lands. Because the panel sits
 * above the buttons, every add is visible the moment it
 * happens.
 */
@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styles: [`
    .panel { border-width: 1px; border-color: #a06a35; border-radius: 12px; padding: 12px; background-color: #fdf6ec; }
  `],
})
export class LogListComponent {
  constructor(private log: ActivityLogService) {}
}
