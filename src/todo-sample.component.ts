import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';

/**
 * Sample: a todo list with some shine. A gloss header card
 * carries the count and the day's progress; every task is
 * its own card with a priority dot, a big check target and
 * its priority named; filters and the add form use chips in
 * the app's bronze. The list lives in TodoService on this
 * device.
 */
@Component({
  selector: 'app-todo-sample',
  templateUrl: './todo-sample.component.html',
  styles: [`
    .hero-base { background-color: #a06a35; border-radius: 16px; padding-bottom: 4px; }
    .hero-face { background-color: #fdf6ec; border-radius: 16px; padding: 16px; gap: 8px; }
    .hero-count { font-size: 24px; font-weight: 700; }
    .chips-row { flex-direction: row; gap: 8px; }
    .chip { border-width: 1px; border-color: #a06a35; border-radius: 9999px; padding: 8px; }
    .chip-on { background-color: #a06a35; }
    .chip-text { font-size: 12px; font-weight: 700; color: #a06a35; }
    .chip-text-on { color: #ffffff; }
    .task-card { flex-direction: row; align-items: center; gap: 8px; padding: 12px; }
    .check-hit { width: 44px; height: 44px; align-items: center; justify-content: center; }
    .check { width: 34px; height: 34px; border-radius: 8px; border-width: 2px; border-color: #a06a35; align-items: center; justify-content: center; }
    .check-done { background-color: #a06a35; }
    .task-main { flex: 1; gap: 4px; }
    .task-text { font-size: 16px; }
    .task-done { color: #6b5d43; opacity: 0.65; }
    .meta-row { flex-direction: row; align-items: center; gap: 4px; }
    .dot { width: 12px; height: 12px; border-radius: 9999px; }
    .p-high { background-color: #b3261e; }
    .p-med { background-color: #e8a91c; }
    .p-low { background-color: #46a758; }
    .prio-text { font-size: 12px; color: #6b5d43; }
    .add-card { gap: 12px; padding: 16px; }
  `],
})
export class TodoSampleComponent {
  draft = '';
  draftPrio = 1;
  filter = 'all';
  rows: any[] = [];
  leftCount = 0;
  doneCount = 0;
  totalCount = 0;
  percent = 0;
  stateLine = '';

  constructor(
    public todos: TodoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.todos.whenLoaded(() => this.refresh('all'));
  }

  refresh(f: string) {
    const all = this.todos.items;
    this.totalCount = all.length;
    this.doneCount = all.filter((t) => t.done).length;
    this.leftCount = this.totalCount - this.doneCount;
    this.percent = this.totalCount === 0 ? 0 : Math.round((this.doneCount * 100) / this.totalCount);
    if (this.totalCount === 0) this.stateLine = 'Nothing here yet. Add your first task below.';
    else if (this.leftCount === 0) this.stateLine = 'Everything is done. A clean page.';
    else this.stateLine = this.leftCount + (this.leftCount === 1 ? ' task' : ' tasks') + ' still to go.';
    if (f === 'active') this.rows = all.filter((t) => !t.done);
    else if (f === 'done') this.rows = all.filter((t) => t.done);
    else this.rows = all;
  }

  pickFilter(f: string) {
    this.filter = f;
    this.refresh(f);
  }

  setPrio(p: number) {
    this.draftPrio = p;
  }

  add() {
    this.todos.add(this.draft, this.draftPrio);
    this.draft = '';
    this.refresh(this.filter);
  }

  toggle(t: any) {
    this.todos.toggle(t.id);
    this.refresh(this.filter);
  }

  remove(t: any) {
    this.todos.remove(t.id);
    this.refresh(this.filter);
  }

  goBack() {
    this.router.navigate(['/samples']);
  }
}
