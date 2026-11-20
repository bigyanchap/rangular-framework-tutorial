import { Injectable } from '@angular/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * The habit sample's store: the reader's habit names and
 * today's ticks, kept in AsyncStorage under one key. Ticks
 * are saved with the day they belong to, and a save from an
 * older day is ignored on load, so every morning starts
 * fresh without any reset job. Plain TypeScript, like every
 * service in this app.
 */
@Injectable({ providedIn: 'root' })
export class HabitService {
  names: string[] = [
    'Morning workout',
    'Read for 20 minutes',
    'Write code for one hour',
    'No phone after 9 pm',
    'Drink two litres of water',
  ];
  doneToday: boolean[] = [false, false, false, false, false];
  storageKey = 'rangular-tutorial.habits.v1';
  loaded = false;
  waiters: any[] = [];

  constructor() {
    AsyncStorage.getItem(this.storageKey).then((raw) => {
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.names !== undefined && saved.names.length > 0) {
          this.names = saved.names;
          this.doneToday = this.names.map(() => false);
        }
        if (saved.day === this.dayKey() && saved.done !== undefined) {
          this.doneToday = this.names.map((_, i) => saved.done[i] === true);
        }
      }
      this.loaded = true;
      const pending = this.waiters;
      this.waiters = [];
      pending.forEach((cb) => cb());
    }, () => {
      this.loaded = true;
    });
  }

  dayKey() {
    return 'day-' + Math.floor(Date.now() / 86400000);
  }

  whenLoaded(cb: () => void) {
    if (this.loaded) cb();
    else this.waiters.push(cb);
  }

  save() {
    AsyncStorage.setItem(
      this.storageKey,
      JSON.stringify({ names: this.names, day: this.dayKey(), done: this.doneToday }),
    );
  }

  toggle(i: number) {
    this.doneToday = this.doneToday.map((d, j) => (j === i ? !d : d));
    this.save();
  }

  add(name: string) {
    this.names = [...this.names, name];
    this.doneToday = [...this.doneToday, false];
    this.save();
  }

  remove(i: number) {
    this.names = this.names.filter((_, j) => j !== i);
    this.doneToday = this.doneToday.filter((_, j) => j !== i);
    this.save();
  }
}
