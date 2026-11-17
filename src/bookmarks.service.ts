import { Injectable } from '@angular/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Bookmarks and resume state: one root instance for the whole
 * app. The lesson screen records the last opened lesson here
 * and toggles bookmarks here; Home reads both to draw its
 * continue row and its bookmarks group.
 *
 * The state is saved on the device with AsyncStorage, so
 * bookmarks and the last lesson keep across restarts. The
 * load runs when the service is made: it reads the saved
 * value and assigns both fields when it arrives. Every
 * change saves again, by assignment, in the same call.
 * Nothing leaves the device.
 */
@Injectable({ providedIn: 'root' })
export class BookmarksService {
  bookmarkIds: number[] = [];
  completions: { id: number; day: string }[] = [];
  lastLessonId = 0;
  howToSeen = false;
  storageKey = 'rangular-tutorial.progress.v1';

  constructor() {
    AsyncStorage.getItem(this.storageKey).then((raw) => {
      if (raw) {
        const saved = JSON.parse(raw);
        this.bookmarkIds = saved.bookmarkIds;
        this.completions = saved.completions === undefined ? [] : saved.completions;
        this.lastLessonId = saved.lastLessonId;
        this.howToSeen = saved.howToSeen === true;
      }
    });
  }

  save() {
    AsyncStorage.setItem(
      this.storageKey,
      JSON.stringify({
        bookmarkIds: this.bookmarkIds,
        completions: this.completions,
        lastLessonId: this.lastLessonId,
        howToSeen: this.howToSeen,
      }),
    );
  }

  dismissHowTo() {
    this.howToSeen = true;
    this.save();
  }

  recordLast(id: number) {
    this.lastLessonId = id;
    this.save();
  }

  isDone(id: number) {
    return this.completions.some((c) => c.id === id);
  }

  markDone(id: number) {
    if (!this.isDone(id)) {
      const day = this.dayKey(0);
      this.completions = [...this.completions, { id, day }];
      this.save();
    }
  }

  /**
   * Calendar keys without a Date object: the method subset has
   * no NewExpression, so the civil date is worked out from the
   * day count since the epoch with plain arithmetic (the
   * standard days to civil conversion). dayKey(0) is today,
   * dayKey(1) is yesterday, and the weekday letter uses the
   * same count, the epoch day being a Thursday.
   */
  dayNumber(offset: number) {
    return Math.floor(Date.now() / 86400000) - offset;
  }

  pad2(n: number) {
    return n < 10 ? '0' + n : String(n);
  }

  dayKey(offset: number) {
    const z = this.dayNumber(offset) + 719468;
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

  weekdayLetter(offset: number) {
    return 'SMTWTFS'.charAt((this.dayNumber(offset) + 4) % 7);
  }

  isBookmarked(id: number) {
    return this.bookmarkIds.indexOf(id) >= 0;
  }

  toggle(id: number) {
    if (this.isBookmarked(id)) {
      this.bookmarkIds = this.bookmarkIds.filter((x) => x !== id);
    } else {
      this.bookmarkIds = [...this.bookmarkIds, id];
    }
    this.save();
  }
}
