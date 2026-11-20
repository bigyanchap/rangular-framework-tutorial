import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HabitService } from './habit.service';

type HabitRow = { name: string; done: boolean };

/**
 * Sample: a habit tracker. One readout on top (how much of
 * today is done), then the checklist itself: a square tick
 * box per habit, in the same check language as the rest of
 * the app, and the habit's name beside it, never inside a
 * control. Add your own habit at the bottom; remove one with
 * its text button. The service owns the list and today's
 * ticks, and a new day starts unticked.
 */
@Component({
  selector: 'app-habit-sample',
  templateUrl: './habit-sample.component.html',
  styles: [`
    .readout { background-color: #fdf6ec; border-color: #a06a35; border-radius: 16px; padding: 16px; }
    .habit-row { flex-direction: row; align-items: center; gap: 12px; padding: 8px; }
    .check-hit { width: 44px; height: 44px; align-items: center; justify-content: center; }
    .check { width: 34px; height: 34px; border-radius: 8px; border-width: 2px; border-color: #a06a35; align-items: center; justify-content: center; }
    .check-on { background-color: #a06a35; }
    .habit-name { flex: 1; font-size: 16px; }
  `],
})
export class HabitSampleComponent {
  rows: HabitRow[] = [];
  doneCount = 0;
  percent = 0;
  newName = '';

  constructor(
    private habits: HabitService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.refresh();
    this.habits.whenLoaded(() => this.refresh());
  }

  refresh() {
    this.rows = this.habits.names.map((name, i) => ({ name, done: this.habits.doneToday[i] === true }));
    this.doneCount = this.rows.filter((r) => r.done).length;
    this.percent = this.rows.length === 0 ? 0 : Math.round((this.doneCount * 100) / this.rows.length);
  }

  toggle(i: number) {
    this.habits.toggle(i);
    this.refresh();
  }

  add() {
    const name = this.newName.trim();
    if (name === '') return;
    this.habits.add(name);
    this.newName = '';
    this.refresh();
  }

  remove(i: number) {
    this.habits.remove(i);
    this.refresh();
  }

  goBack() {
    this.router.navigate(['/samples']);
  }
}
