import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlarmService } from './alarm.service';

/**
 * Sample: an alarm clock. One time, one tone, the way a
 * first alarm in an app like Awaken Me begins. The picker
 * holds the time being chosen; Set alarm hands it to the
 * service, which schedules the system notification and arms
 * the in-app ringing. The screen reads the service directly:
 * its state lines and its ringing panel follow the service,
 * so the panel appears the moment the alarm fires.
 */
@Component({
  selector: 'app-alarm-sample',
  templateUrl: './alarm-sample.component.html',
  styles: [`
    .readout { background-color: #fdf6ec; border-color: #a06a35; border-radius: 16px; padding: 16px; }
    .big-time { font-size: 32px; font-weight: 700; text-align: center; }
    .state-line { text-align: center; }
  `],
})
export class AlarmSampleComponent {
  picked = '07:00';

  constructor(
    public alarm: AlarmService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.picked = this.alarm.time;
  }

  onTime(value: string) {
    this.picked = value;
  }

  setAlarm() {
    this.alarm.setAlarm(this.picked);
  }

  turnOff() {
    this.alarm.cancel();
  }

  stopRinging() {
    this.alarm.stop();
  }

  goBack() {
    this.router.navigate(['/samples']);
  }
}
