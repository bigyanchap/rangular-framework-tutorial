import { Component } from '@angular/core';
import { ActivityLogService } from './activity-log.service';
import { DeviceKeyComponent } from './device-key.component';

/**
 * Capstone part 1's quick add: three honest device keys
 * under the log panel, each one a single call into the log
 * service. No form yet: this lesson builds the data layer
 * and its simplest writer.
 */
@Component({
  selector: 'app-log-quick-add',
  templateUrl: './log-quick-add.component.html',
  styles: [`
    .btnrow { flex-direction: row; gap: 8px; }
  `],
})
export class LogQuickAddComponent {
  constructor(private log: ActivityLogService) {}

  reading() {
    this.log.add('Reading', 20);
  }

  coding() {
    this.log.add('Coding', 30);
  }

  walking() {
    this.log.add('Walking', 15);
  }
}
