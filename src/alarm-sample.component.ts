import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBar } from '@angular/material/snack-bar';
import { AlarmService } from './alarm.service';

/**
 * Sample: one alarm, dressed in the Option A language
 * Bigyan picked on 2026-11-21. A flat blue band carries
 * the ALARM eyebrow, the time in display size, the title
 * and repeat days as one sub line, and the switch, green
 * when on and grey when off. Under it, a settings card:
 * the time wheel, a Repeat row built as a proper button
 * row (an icon in a tinted circle, the label over the
 * value, a chevron in a tinted circle) opening the Repeat
 * dialog, and the title field. While it rings, the band
 * becomes the ringing view, with Stop and Snooze. The
 * page edits a DRAFT (his call,
 * 2026-11-21): every control changes only the draft,
 * a Save button shows while the draft differs from the
 * saved alarm, and Save is the moment the scheduling
 * starts, confirmed by a toast with the next ring. The
 * ringing card reads the saved service values, never
 * the draft.
 */
@Component({
  selector: 'app-alarm-sample',
  templateUrl: './alarm-sample.component.html',
  styles: [`
    .band { background-color: #0b57d0; border-radius: 16px; padding: 16px; gap: 8px; }
    .band-top { flex-direction: row; align-items: center; gap: 12px; }
    .eyebrow { flex: 1; font-size: 12px; font-weight: 700; letter-spacing: 1px; color: #ffffff; }
    .band-time { font-size: 32px; line-height: 40px; font-weight: 700; color: #ffffff; }
    .band-sub { font-size: 14px; color: #d3e3fd; }
    .settings-card { gap: 12px; padding: 16px; }
    .set-row { flex-direction: row; align-items: center; gap: 12px; }
    .set-ic { width: 32px; height: 32px; border-radius: 9999px; background-color: #e8f0fe; align-items: center; justify-content: center; }
    .set-main { flex: 1; gap: 4px; }
    .set-label { font-size: 12px; color: #5f6368; }
    .set-value { font-size: 16px; font-weight: 600; }
    .set-chev { width: 28px; height: 28px; border-radius: 9999px; background-color: #e8f0fe; align-items: center; justify-content: center; }
    .day-row { flex-direction: row; align-items: center; gap: 12px; padding: 8px; }
    .day-name { flex: 1; font-size: 16px; }
    .check { width: 34px; height: 34px; border-radius: 8px; border-width: 2px; border-color: #34a853; align-items: center; justify-content: center; }
    .check-done { background-color: #34a853; }
    .note { font-size: 12px; color: #5f6368; }
    .ring-band { background-color: #0b57d0; border-radius: 16px; padding: 16px; gap: 12px; align-items: center; }
    .ring-label { font-size: 12px; font-weight: 700; letter-spacing: 1px; color: #d3e3fd; }
    .ring-time { font-size: 32px; line-height: 40px; font-weight: 700; color: #ffffff; }
    .ring-title { font-size: 16px; font-weight: 600; color: #ffffff; }
    .ring-actions { flex-direction: row; gap: 12px; }
  `],
})
export class AlarmSampleComponent {
  titleDraft = '';
  draftTime = '';
  draftDays: number[] = [];
  draftEnabled = false;
  dirty = false;
  cardTitle = '';
  timeLabel = '';
  ringLabel = '';
  daysLabel = '';
  bandSub = '';
  repeatOpen = false;
  dayRows: any[] = [];
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayFullNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(
    public alarm: AlarmService,
    private router: Router,
    private snack: SnackBar,
  ) {}

  ngOnInit() {
    this.copyDrafts();
  }

  copyDrafts() {
    this.applyDraft(this.alarm.timeIso, this.alarm.title, this.alarm.days.slice(), this.alarm.enabled);
  }

  refresh() {
    this.applyDraft(this.draftTime, this.titleDraft, this.draftDays, this.draftEnabled);
  }

  /**
   * Every draft change goes through here with the fresh
   * values as arguments: a method that assigns a field
   * and then reads it back sees the old value, so the
   * view fields are computed from the arguments, never
   * from reads after an assignment.
   */
  applyDraft(time: string, title: string, days: number[], enabled: boolean) {
    this.draftTime = time;
    this.titleDraft = title;
    this.draftDays = days;
    this.draftEnabled = enabled;
    this.timeLabel = this.fmtTime(time);
    this.ringLabel = this.fmtTime(this.alarm.timeIso);
    const ct = title === '' ? 'Alarm' : title;
    const dl = this.computeDaysLabel(days);
    this.cardTitle = ct;
    this.daysLabel = dl;
    this.bandSub = ct + ' · ' + dl;
    this.dayRows = [0, 1, 2, 3, 4, 5, 6].map((d) => ({ d, name: this.dayFullNames[d], on: days.indexOf(d) >= 0 }));
    this.dirty = time.slice(11) !== this.alarm.timeIso.slice(11)
      || title !== this.alarm.title
      || days.join(',') !== this.alarm.days.join(',')
      || enabled !== this.alarm.enabled;
  }

  fmtTime(iso: string) {
    const h = Number(iso.slice(11, 13));
    const suffix = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + ':' + iso.slice(14, 16) + ' ' + suffix;
  }

  computeDaysLabel(days: number[]) {
    if (days.length === 0) return 'Never';
    if (days.length === 7) return 'Every day';
    if (days.length === 5 && days.indexOf(1) >= 0 && days.indexOf(5) >= 0 && days.indexOf(0) < 0 && days.indexOf(6) < 0) return 'Weekdays';
    if (days.length === 2 && days.indexOf(0) >= 0 && days.indexOf(6) >= 0) return 'Weekends';
    return this.dayNames.filter((n, i) => days.indexOf(i) >= 0).join(', ');
  }

  setTime(iso: string) {
    this.applyDraft(iso, this.titleDraft, this.draftDays, this.draftEnabled);
  }

  applyTitle(v: string) {
    this.applyDraft(this.draftTime, v.slice(0, 50), this.draftDays, this.draftEnabled);
  }

  toggleDay(d: number) {
    const next = this.draftDays.indexOf(d) >= 0
      ? this.draftDays.filter((x) => x !== d)
      : this.draftDays.concat([d]);
    this.applyDraft(this.draftTime, this.titleDraft, next, this.draftEnabled);
  }

  /**
   * Save is the commit: the service stores the draft and
   * arms the alarm, and the toast says what was saved
   * and when it will ring.
   */
  save() {
    this.alarm.save(this.draftTime, this.titleDraft, this.draftDays, this.draftEnabled);
    if (!this.alarm.enabled) {
      this.snack.open('Alarm saved. It is off.');
    } else if (this.alarm.days.length === 0) {
      this.snack.open('Alarm saved. Pick at least one day to make it ring.');
    } else {
      this.snack.open('Alarm saved. It will ring ' + this.alarm.nextDayWord() + ' at ' + this.fmtTime(this.alarm.timeIso) + '.');
    }
    this.copyDrafts();
    this.refresh();
  }

  openRepeat() {
    this.repeatOpen = true;
  }

  closeRepeat() {
    this.repeatOpen = false;
  }

  onSwitch(v: boolean) {
    this.applyDraft(this.draftTime, this.titleDraft, this.draftDays, v);
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
