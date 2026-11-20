import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlarmService } from './alarm.service';

/**
 * Sample: one alarm, modelled closely on the alarm in
 * Awaken Me. The card carries the title, the time in display
 * size, a repeat badge, the tone tag, and the switch. Below
 * it, the settings: when, repeat days, title and volume.
 * When the alarm fires with the app open, the page becomes
 * the ringing screen from Awaken Me: the time in large type,
 * the tone's progress, and round Stop and Snooze controls.
 * One alarm and one tone only; the colours stay this app's.
 */
@Component({
  selector: 'app-alarm-sample',
  templateUrl: './alarm-sample.component.html',
  styles: [`
    .alarm-card { flex-direction: row; gap: 12px; padding: 16px; }
    .card-main { flex: 1; gap: 4px; }
    .time-row { flex-direction: row; align-items: center; gap: 8px; }
    .big-time { font-size: 32px; font-weight: 700; }
    .badge { background-color: #fdf6ec; border-width: 1px; border-color: #d8c9ae; border-radius: 8px; padding: 4px; }
    .badge-text { font-size: 12px; font-weight: 700; color: #a06a35; }
    .tag-row { flex-direction: row; }
    .tone-tag { flex-direction: row; align-items: center; gap: 4px; background-color: #fdf6ec; border-radius: 8px; padding: 4px; }
    .tone-name { font-size: 12px; font-weight: 500; }
    .tone-dur { font-size: 12px; color: #6b5d43; }
    .switch { width: 60px; height: 44px; border-radius: 9999px; background-color: #d8c9ae; flex-direction: row; align-items: center; padding: 4px; }
    .switch-on { background-color: #a06a35; justify-content: flex-end; }
    .knob { width: 34px; height: 34px; border-radius: 9999px; background-color: #ffffff; }
    .settings { gap: 12px; padding: 16px; }
    .days-row { flex-direction: row; gap: 4px; }
    .day-chip { flex: 1; height: 44px; border-radius: 12px; border-width: 1px; border-color: #a06a35; align-items: center; justify-content: center; }
    .day-on { background-color: #a06a35; }
    .day-text { font-size: 12px; font-weight: 700; color: #a06a35; }
    .day-text-on { color: #ffffff; }
    .ringing { align-items: center; gap: 16px; padding: 24px; }
    .ring-label { font-size: 12px; font-weight: 700; color: #a06a35; }
    .ring-time { font-size: 32px; font-weight: 700; }
    .ring-actions { flex-direction: row; gap: 16px; align-items: center; }
    .round-btn { width: 56px; height: 56px; border-radius: 9999px; background-color: #b3261e; align-items: center; justify-content: center; }
    .stop-square { width: 20px; height: 20px; border-radius: 8px; background-color: #ffffff; }
    .foot-note { color: #6b5d43; }
  `],
})
export class AlarmSampleComponent {
  picked = '07:00';
  titleDraft = 'Wake up';
  volumePct = 80;
  timeLabel = '7:00 AM';
  daysLabel = 'Every day';
  dayIdx = [0, 1, 2, 3, 4, 5, 6];
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(
    public alarm: AlarmService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.alarm.whenLoaded(() => {
      this.picked = this.alarm.time;
      this.titleDraft = this.alarm.title;
      this.volumePct = Math.round(this.alarm.volume * 100);
      this.refresh();
    });
  }

  refresh() {
    const bits = this.alarm.time.split(':');
    let h = Number(bits[0]);
    const suffix = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    this.timeLabel = h + ':' + bits[1] + ' ' + suffix;
    if (this.alarm.days.length === 7) this.daysLabel = 'Every day';
    else if (this.alarm.days.join(',') === '1,2,3,4,5') this.daysLabel = 'Weekdays';
    else if (this.alarm.days.join(',') === '0,6') this.daysLabel = 'Weekends';
    else this.daysLabel = this.alarm.days.map((d) => this.dayNames[d]).join(' ');
  }

  toggleAlarm() {
    this.alarm.setEnabled(!this.alarm.enabled);
  }

  onTime(ev: string) {
    this.picked = ev;
    this.alarm.setTime(ev);
    this.refresh();
  }

  toggleDay(d: number) {
    this.alarm.toggleDay(d);
    this.refresh();
  }

  applyTitle(v: string) {
    this.titleDraft = v.slice(0, 50);
    this.alarm.setTitle(this.titleDraft);
  }

  previewTone() {
    this.alarm.preview();
  }

  onVolume(ev: number) {
    this.volumePct = ev;
    this.alarm.setVolume(ev);
  }

  stop() {
    this.alarm.stopRing();
  }

  snooze() {
    this.alarm.snooze();
  }

  goBack() {
    this.router.navigate(['/samples']);
  }
}
