import { Injectable } from '@angular/core';
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * The Todo sample's store: the task list, kept on this
 * device. A task has a title, a priority (0 low, 1 medium,
 * 2 high), a done flag, an optional description and an
 * optional deadline (an ISO date, empty when the task has
 * none). First run seeds three example tasks so the page
 * shows its colours at once; after that, the list is
 * entirely the reader's own. Lists saved before the
 * description and deadline arrived load with both empty.
 * Every change is a fresh array assignment, which is what
 * re-renders the page.
 */
@Injectable({ providedIn: 'root' })
export class TodoService {
  storageKey = 'rangular-tutorial.todos.v1';
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  items: any[] = [];
  loaded = false;
  waiters: any[] = [];
  seq = 0;

  constructor() {
    AsyncStorage.getItem(this.storageKey).then((raw) => {
      if (raw) {
        this.items = JSON.parse(raw).map((t: any) => ({ id: t.id, text: t.text, prio: t.prio, done: t.done, desc: t.desc ? t.desc : '', due: t.due ? t.due : '' }));
      } else {
        this.items = [
          { id: 1, text: 'Design the new landing page', prio: 2, done: false, desc: 'Pricing and the signup section, in the new brand colours.', due: this.keyPlus(2) + 'T00:00:00' },
          { id: 2, text: 'Review the open pull requests', prio: 1, done: false, desc: 'Start with the two oldest ones.', due: '' },
          { id: 3, text: 'Book flights for the team offsite', prio: 0, done: true, desc: '', due: this.keyPlus(-3) + 'T00:00:00' },
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

  add(text: string, prio: number, desc: string, due: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    this.seq = (this.seq + 1) % 10;
    const id = Date.now() * 10 + this.seq;
    this.items = this.items.concat([{ id, text: trimmed, prio, done: false, desc: desc.trim(), due }]);
    this.persist();
  }

  update(id: number, text: string, prio: number, desc: string, due: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    this.items = this.items.map((t) => (t.id === id ? { id: t.id, text: trimmed, prio, done: t.done, desc: desc.trim(), due } : t));
    this.persist();
  }

  toggle(id: number) {
    this.items = this.items.map((t) => (t.id === id ? { id: t.id, text: t.text, prio: t.prio, done: !t.done, desc: t.desc, due: t.due } : t));
    this.persist();
  }

  pad2(n: number) {
    return n < 10 ? '0' + n : String(n);
  }

  /** The civil date key (YYYY-MM-DD) some days from today: 0 is today, 2 is the day after tomorrow, -3 is three days ago. Worked out from the day count since the epoch, the same conversion the bookmarks service uses. */
  keyPlus(days: number) {
    const z = Math.floor(Date.now() / 86400000) + days + 719468;
    const era = Math.floor(z / 146097);
    const doe = z - era * 146097;
    const yoe = Math.floor((doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365);
    const y = yoe + era * 400;
    const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
    const mp = Math.floor((5 * doy + 2) / 153);
    const d = doy - Math.floor((153 * mp + 2) / 5) + 1;
    const m = mp + (mp < 10 ? 3 : -9);
    const year = m <= 2 ? y + 1 : y;
    return year + '-' + this.pad2(m) + '-' + this.pad2(d);
  }

  todayIso() {
    return this.keyPlus(0) + 'T00:00:00';
  }

  /** How a deadline reads on a task card: Due today, Due tomorrow, Due 25 Nov, or Overdue once the day has passed on a task still open. A finished task never reads overdue. */
  dueInfo(due: string, done: boolean) {
    if (!due) return { text: '', overdue: false };
    const key = due.slice(0, 10);
    const label = Number(key.slice(8, 10)) + ' ' + this.monthNames[Number(key.slice(5, 7)) - 1];
    if (key === this.keyPlus(0)) return { text: 'Due today', overdue: false };
    if (key === this.keyPlus(1)) return { text: 'Due tomorrow', overdue: false };
    if (key < this.keyPlus(0)) {
      if (done) return { text: 'Due ' + label, overdue: false };
      return { text: 'Overdue · ' + label, overdue: true };
    }
    return { text: 'Due ' + label, overdue: false };
  }

  remove(id: number) {
    this.items = this.items.filter((t) => t.id !== id);
    this.persist();
  }
}
