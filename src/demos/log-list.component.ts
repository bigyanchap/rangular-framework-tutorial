import { Component } from '@angular/core';
import { ActivityLogService } from './activity-log.service';

/**
 * Capstone part 1's list: it only reads the log service, the
 * entries and the running total, and shows an empty state
 * until the first activity lands.
 */
@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
})
export class LogListComponent {
  constructor(private log: ActivityLogService) {}
}
