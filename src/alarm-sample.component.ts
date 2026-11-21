import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlarmService } from './alarm.service';

/**
 * Sample: one alarm, in this app's own design language.
 * A card with the title, the time in display size, the
 * repeat days in the app's blue and a switch; a settings
 * card with the time wheel, the day chips and the title;
 * and, while it rings, a ringing card with Stop and
 * Snooze. The state lives in AlarmService; this component
 * is a thin shell that rebuilds its labels after every
 * change, the same shape as the other samples.
 */
@Component({
  selector: 'app-alarm-sample',
  templateUrl: './alarm-sample.component.html',
  styles: [`
    .alarm-card { gap: 8px; padding: 16px; }
    .alarm-top { flex-direction: row; align-items: center; gap: 12px; }
    .alarm-main { flex: 1; gap: 4px; }
    .alarm-time { font-size: 32px; line-height: 40px; font-weight: 700; }
    .badge { font-size: 12px; font-weight: 700; color: #0b57d0; }
    .settings-card { gap: 12px; padding: 16px; }
    .repeat-row { flex-direction: row; align-items: center; gap: 8px; }
    .repeat-label { flex: 1; font-size: 16px; }
    .day-row { flex-direction: row; align-items: center; gap: 12px; padding: 8px; }
    .day-name { flex: 1; font-size: 16px; }
    .check { width: 34px; height: 34px; border-radius: 8px; border-width: 2px; border-color: #34a853; align-items: center; justify-content: center; }
    .check-done { background-color: #34a853; }
    .note { font-size: 12px; color: #5f6368; }
    .ring-card { gap: 12px; padding: 16px; align-items: center; }
    .ring-label { font-size: 12px; font-weight: 700; color: #b3261e; }
    .ring-time { font-size: 32px; line-height: 40px; font-weight: 700; }
    .ring-actions { flex-direction: row; gap: 12px; }
  `],
})
export class AlarmSampleComponent {
  titleDraft = '';
  timeLabel = '';
  daysLabel = '';
  repeatOpen = false;
  dayRows: any[] = [];
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayFullNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(
    public alarm: AlarmService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.titleDraft = this.alarm.title;
    this.refresh();
  }

  refresh() {
    this.timeLabel = this.fmtTime(this.alarm.timeIso);
    this.daysLabel = this.computeDaysLabel();
    this.dayRows = [0, 1, 2, 3, 4, 5, 6].map((d) => ({ d, name: this.dayFullNames[d], on: this.alarm.days.indexOf(d) >= 0 }));
  }

  fmtTime(iso: string) {
    const h = Number(iso.slice(11, 13));
    const suffix = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + ':' + iso.slice(14, 16) + ' ' + suffix;
  }

  computeDaysLabel() {
    const days = this.alarm.days;
    if (days.length === 0) return 'Never';
    if (days.length === 7) return 'Every day';
    if (days.length === 5 && days.indexOf(1) >= 0 && days.indexOf(5) >= 0 && days.indexOf(0) < 0 && days.indexOf(6) < 0) return 'Weekdays';
    if (days.length === 2 && days.indexOf(0) >= 0 && days.indexOf(6) >= 0) return 'Weekends';
    return this.dayNames.filter((n, i) => days.indexOf(i) >= 0).join(', ');
  }

  setTime(iso: string) {
    this.alarm.setTime(iso);
    this.refresh();
  }

  applyTitle(v: string) {
    this.titleDraft = v.slice(0, 50);
    this.alarm.setTitle(this.titleDraft);
    this.refresh();
  }

  toggleDay(d: number) {
    this.alarm.toggleDay(d);
    this.refresh();
  }

  openRepeat() {
    this.repeatOpen = true;
  }

  closeRepeat() {
    this.repeatOpen = false;
  }

  onSwitch(v: boolean) {
    this.alarm.setEnabled(v);
    this.refresh();
  }

  stop() {
    this.alarm.stopRing();
    this.refresh();
  }

  snooze() {
    this.alarm.snooze();
    this.refresh();
  }

  goBack() {
    this.router.navigate(['/samples']);
  }
}
