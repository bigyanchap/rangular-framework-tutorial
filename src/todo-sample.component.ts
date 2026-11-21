import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';

/**
 * Sample: a todo list in this app's own design language.
 * Every task is its own card with a priority dot, a big
 * check target and its priority named; a done check is
 * green, the same green the Learn page puts on a finished
 * lesson, and the filter and priority chips are the app's
 * blue. A task may carry a short description under its
 * title and a deadline beside its priority, which reads
 * Overdue in red while the task is still open. The plus
 * at the top right opens the add form as a bottom sheet
 * with clear space under its buttons, so nothing hides
 * behind the Android bar; the sheet's Deadline switch
 * reveals a date picker for the task's due day. New tasks
 * land at the end of the list, so an added task is seen
 * at once. Three dots at the right of a card open its
 * menu: Edit reopens the same sheet with the task filled
 * in, and Delete asks first, in a dialog that names the
 * task, before anything is removed. The list lives in
 * TodoService on this device.
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
    .task-desc { font-size: 14px; color: #5f6368; }
    .due-text { font-size: 12px; color: #5f6368; }
    .due-over { color: #b3261e; font-weight: 700; }
    .due-row { flex-direction: row; align-items: center; justify-content: space-between; }
    .due-label { font-size: 14px; font-weight: 700; }
    .more-hit { width: 44px; height: 44px; align-items: center; justify-content: center; }
    .more-dots { gap: 4px; align-items: center; }
    .more-dot { width: 4px; height: 4px; border-radius: 9999px; background-color: #5f6368; }
    .sheet-wrap { gap: 12px; padding-bottom: 24px; }
  `],
})
export class TodoSampleComponent {
  draft = '';
  draftDesc = '';
  draftDueOn = false;
  draftDue = '';
  draftPrio = 1;
  filter = 'all';
  addOpen = false;
  editingId = 0;
  menuOpen = false;
  menuTarget: any = null;
  deleteTarget: any = null;
  deleteText = '';
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

  rowOf(t: any) {
    const info = this.todos.dueInfo(t.due, t.done);
    return { id: t.id, text: t.text, prio: t.prio, done: t.done, desc: t.desc, due: t.due, dueText: info.text, overdue: info.overdue };
  }

  refresh(f: string) {
    const all = this.todos.items;
    this.totalCount = all.length;
    this.doneCount = all.filter((t) => t.done).length;
    this.leftCount = this.totalCount - this.doneCount;
    if (f === 'active') this.rows = all.filter((t) => !t.done).map((t) => this.rowOf(t));
    else if (f === 'done') this.rows = all.filter((t) => t.done).map((t) => this.rowOf(t));
    else this.rows = all.map((t) => this.rowOf(t));
  }

  pickFilter(f: string) {
    this.filter = f;
    this.refresh(f);
  }

  setPrio(p: number) {
    this.draftPrio = p;
  }

  openAdd() {
    this.editingId = 0;
    this.draft = '';
    this.draftDesc = '';
    this.draftPrio = 1;
    this.draftDueOn = false;
    this.draftDue = this.todos.todayIso();
    this.addOpen = true;
  }

  openMenu(t: any) {
    this.menuTarget = t;
    this.menuOpen = true;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  startEdit() {
    const t = this.menuTarget;
    this.menuOpen = false;
    if (!t) return;
    this.editingId = t.id;
    this.draft = t.text;
    this.draftDesc = t.desc;
    this.draftPrio = t.prio;
    this.draftDueOn = t.due !== '';
    this.draftDue = t.due !== '' ? t.due : this.todos.todayIso();
    this.addOpen = true;
  }

  askDelete() {
    const t = this.menuTarget;
    this.menuOpen = false;
    if (!t) return;
    this.deleteTarget = t;
    this.deleteText = 'This deletes ' + t.text + ' for good. There is no undo.';
  }

  cancelDelete() {
    this.deleteTarget = null;
  }

  confirmDelete() {
    if (this.deleteTarget) this.todos.remove(this.deleteTarget.id);
    this.deleteTarget = null;
    this.refresh(this.filter);
  }

  setDueOn(v: boolean) {
    this.draftDueOn = v;
  }

  setDue(iso: string) {
    this.draftDue = iso;
  }

  closeAdd() {
    this.addOpen = false;
  }

  save() {
    if (!this.draft.trim()) return;
    const f = this.filter === 'done' ? 'all' : this.filter;
    if (this.editingId > 0) this.todos.update(this.editingId, this.draft, this.draftPrio, this.draftDesc, this.draftDueOn ? this.draftDue : '');
    else this.todos.add(this.draft, this.draftPrio, this.draftDesc, this.draftDueOn ? this.draftDue : '');
    this.draft = '';
    this.draftDesc = '';
    this.draftDueOn = false;
    this.editingId = 0;
    this.filter = f;
    this.addOpen = false;
    this.refresh(f);
  }

  toggle(t: any) {
    this.todos.toggle(t.id);
    this.refresh(this.filter);
  }

  goBack() {
    this.router.navigate(['/samples']);
  }
}
