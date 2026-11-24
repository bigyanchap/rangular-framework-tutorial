import { Component } from '@angular/core';

/**
 * Lesson 92's live demo: the calendar month view. The
 * selected day rides [value] in and (change) out as an
 * ISO string, and the line below shows the string the
 * class actually holds. The class seeds the field with
 * today when the demo opens, so the calendar opens on
 * the current month the way a real calendar does, and
 * the button writes today back after browsing or after
 * tapping another day, proving the value is the class's
 * field and not the calendar's private state. Today is
 * built from Date.now() with civil date math, the same
 * days-since-epoch pattern the rest of the app uses.
 */
@Component({
  selector: 'app-calendar-demo',
  templateUrl: './calendar.component.html',
})
export class CalendarDemoComponent {
  day = '';

  ngOnInit() {
    this.day = this.todayIso();
  }

  onDay(v: string) {
    this.day = v;
  }

  backToToday() {
    this.day = this.todayIso();
  }

  todayIso() {
    const days = Math.floor(Date.now() / 86400000);
    const z = days + 719468;
    const era = Math.floor(z / 146097);
    const doe = z - era * 146097;
    const yoe = Math.floor((doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365);
    const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
    const mp = Math.floor((5 * doy + 2) / 153);
    const d = doy - Math.floor((153 * mp + 2) / 5) + 1;
    const m = this.monthOf(mp);
    const y = this.yearOf(yoe, era, m);
    return y + '-' + this.pad2(m) + '-' + this.pad2(d) + 'T00:00:00';
  }

  monthOf(mp: number) {
    if (mp < 10) {
      return mp + 3;
    }
    return mp - 9;
  }

  yearOf(yoe: number, era: number, m: number) {
    if (m <= 2) {
      return yoe + era * 400 + 1;
    }
    return yoe + era * 400;
  }

  pad2(n: number) {
    if (n < 10) {
      return '0' + n;
    }
    return '' + n;
  }
}
