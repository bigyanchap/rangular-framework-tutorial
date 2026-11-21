import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';

/**
 * Sample: a todo list in this app's own design language.
 * Every task is its own card with a priority dot, a big
 * check target and its priority named; a done check is
 * green, the same green the Learn page puts on a finished
 * lesson, and the filter and priority chips are the app's
 * blue. The plus at the top right opens the add form as a
 * bottom sheet with clear space under its buttons, so
 * nothing hides behind the Android bar. New tasks land at
 * the end of the list, so an added task is seen at once.
 * The list lives in TodoService on this device.
 */
@Component({
  selector: 'app-todo-sample',
  templateUrl: './todo-sample.component.html',
  styles: [`
    .chips-row { flex-direction: row; gap: 8px; }
    .chip { border-width: 1px; border-color: #0b57d0; border-radius: 9999px; padding: 8px; }
    .chip-on { background-color: #0b57d0; }
    .chip-text { font-size: 12px; font-weight: 700; color: #0b57d0; }
    .chip-text-on { color: #ffffff; }
    .task-card { flex-direction: row; align-items: center; gap: 8px; padding: 12px; }
    .check-hit { width: 44px; height: 44px; align-items: center; justify-content: center; }
    .check { width: 34px; height: 34px; border-radius: 8px; border-width: 2px; border-color: #34a853; align-items: center; justify-content: center; }
    .check-done { background-color: #34a853; }
    .task-main { flex: 1; gap: 4px; }
    .task-text { font-size: 16px; }
    .task-done { color: #5f6368; opacity: 0.65; }
    .meta-row { flex-direction: row; align-items: center; gap: 4px; }
    .dot { width: 12px; height: 12px; border-radius: 9999px; }
    .p-high { background-color: #b3261e; }
    .p-med { background-color: #f9ab00; }
    .p-low { background-color: #34a853; }
    .prio-text { font-size: 12px; color: #5f6368; }
    .sheet-wrap { gap: 12px; padding-bottom: 24px; }
  `],
})
export class TodoSampleComponent {
  draft = '';
  draftPrio = 1;
  filter = 'all';
  addOpen = false;
  rows: any[] = [];
  leftCount = 0;
  doneCount = 0;
  totalCount = 0;

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

  openAdd() {
    this.addOpen = true;
  }

  closeAdd() {
    this.addOpen = false;
  }

  add() {
    if (!this.draft.trim()) return;
    const f = this.filter === 'done' ? 'all' : this.filter;
    this.todos.add(this.draft, this.draftPrio);
    this.draft = '';
    this.filter = f;
    this.addOpen = false;
    this.refresh(f);
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
