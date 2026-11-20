import { Injectable } from '@angular/core';
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * The Todo sample's store: the task list, kept on this
 * device. A task has a title, a priority (0 low, 1 medium,
 * 2 high) and a done flag. First run seeds three example
 * tasks so the page shows its colours at once; after that,
 * the list is entirely the reader's own. Every change is a
 * fresh array assignment, which is what re-renders the page.
 */
@Injectable({ providedIn: 'root' })
export class TodoService {
  storageKey = 'rangular-tutorial.todos.v1';
  items: any[] = [];
  loaded = false;
  waiters: any[] = [];
  seq = 0;

  constructor() {
    AsyncStorage.getItem(this.storageKey).then((raw) => {
      if (raw) {
        this.items = JSON.parse(raw);
      } else {
        this.items = [
          { id: 1, text: 'Design the new landing page', prio: 2, done: false },
          { id: 2, text: 'Review the open pull requests', prio: 1, done: false },
          { id: 3, text: 'Book flights for the team offsite', prio: 0, done: true },
        ];
        this.persist();
      }
      this.loaded = true;
      this.waiters.forEach((cb) => cb());
      this.waiters = [];
    }, () => {
      this.loaded = true;
      this.waiters.forEach((cb) => cb());
      this.waiters = [];
    });
  }

  whenLoaded(cb: () => void) {
    if (this.loaded) cb();
    else this.waiters = this.waiters.concat([cb]);
  }

  persist() {
    AsyncStorage.setItem(this.storageKey, JSON.stringify(this.items)).then(() => {}, () => {});
  }

  add(text: string, prio: number) {
    const trimmed = text.trim();
    if (!trimmed) return;
    this.seq = (this.seq + 1) % 10;
    const id = Date.now() * 10 + this.seq;
    this.items = [{ id, text: trimmed, prio, done: false }].concat(this.items);
    this.persist();
  }

  toggle(id: number) {
    this.items = this.items.map((t) => (t.id === id ? { id: t.id, text: t.text, prio: t.prio, done: !t.done } : t));
    this.persist();
  }

  remove(id: number) {
    this.items = this.items.filter((t) => t.id !== id);
    this.persist();
  }
}
