import { Injectable } from '@angular/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Vibration } from 'react-native';

/**
 * The Alarm sample's store, the simple version: one alarm,
 * kept on this device. A one second heartbeat compares the
 * clock with the next ring time, which arm() works out from
 * the picked time and the repeat days with plain calendar
 * arithmetic: the picked ISO string carries the local date,
 * its weekday comes from a days-from-civil conversion, and
 * the first picked day whose moment is still ahead wins.
 * Ringing is this page plus vibration. There is no system
 * notification and no sound file, on purpose: those were
 * the parts that made the first alarm sample fragile.
 */
@Injectable({ providedIn: 'root' })
export class AlarmService {
  storageKey = 'rangular-tutorial.alarm.v2';
  timeIso = '2026-11-13T07:00:00';
  title = 'Wake up';
  days: number[] = [0, 1, 2, 3, 4, 5, 6];
  enabled = false;
  ringing = false;
  target = 0;
  timer: any = null;

  constructor() {
    AsyncStorage.getItem(this.storageKey).then((raw) => {
      if (raw) {
        const saved = JSON.parse(raw);
        this.timeIso = saved.timeIso;
        this.title = saved.title;
        this.days = saved.days;
        this.enabled = saved.enabled === true;
      }
      this.arm();
    }, () => {
      this.arm();
    });
    this.timer = setInterval(() => this.tick(), 1000);
  }

  persist() {
    AsyncStorage.setItem(
      this.storageKey,
      JSON.stringify({ timeIso: this.timeIso, title: this.title, days: this.days, enabled: this.enabled }),
    ).then(() => {}, () => {});
  }

  daysFromCivil(y: number, m: number, d: number) {
    const yy = m <= 2 ? y - 1 : y;
    const era = Math.floor(yy / 400);
    const yoe = yy - era * 400;
    const mp = m > 2 ? m - 3 : m + 9;
    const doy = Math.floor((153 * mp + 2) / 5) + d - 1;
    const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
    return era * 146097 + doe - 719468;
  }

  arm() {
    if (!this.enabled || this.days.length === 0) {
      this.target = 0;
      return;
    }
    const base = Date.parse(this.timeIso);
    if (!base) {
      this.target = 0;
      return;
    }
    const startWeekday = (this.daysFromCivil(Number(this.timeIso.slice(0, 4)), Number(this.timeIso.slice(5, 7)), Number(this.timeIso.slice(8, 10))) + 4) % 7;
    const now = Date.now();
    this.target = 0;
    [0, 1, 2, 3, 4, 5, 6, 7].forEach((k) => {
      if (this.target > 0) return;
      if (this.days.indexOf((startWeekday + k) % 7) < 0) return;
      const cand = base + k * 86400000;
      if (cand > now) this.target = cand;
    });
  }

  tick() {
    if (this.enabled && !this.ringing && this.target > 0 && Date.now() >= this.target) {
      this.fire();
    }
  }

  fire() {
    this.ringing = true;
    if (Platform.OS !== 'web') {
      Vibration.vibrate([500, 500], true);
    }
  }

  stopRing() {
    this.ringing = false;
    Vibration.cancel();
    this.arm();
  }

  snooze() {
    this.ringing = false;
    Vibration.cancel();
    this.target = Date.now() + 300000;
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    if (!on && this.ringing) {
      this.ringing = false;
      Vibration.cancel();
    }
    this.persist();
    this.arm();
  }

  setTime(iso: string) {
    this.timeIso = iso;
    this.persist();
    this.arm();
  }

  setTitle(t: string) {
    this.title = t ? t.slice(0, 50) : 'Alarm';
    this.persist();
  }

  toggleDay(d: number) {
    if (this.days.indexOf(d) >= 0) {
      this.days = this.days.filter((x) => x !== d);
    } else {
      this.days = this.days.concat([d]);
    }
    this.persist();
    this.arm();
  }
}
