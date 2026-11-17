import { Injectable } from '@angular/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

/**
 * Bookmarks, completions and resume state: one root instance
 * for the whole app. The lesson screen records the last opened
 * lesson here and toggles bookmarks here; Home reads both to
 * draw its path, and the Progress tab reads the completions as
 * the learning history.
 *
 * On a phone the state lives in a SQLite database on the device
 * (rangular-tutorial.db, installed by expo-sqlite): a bookmarks
 * table, a completions table holding the day each lesson was
 * finished, and a settings table for the last lesson and the
 * How-to flag. This service is the one owner of that database,
 * the same pattern the framework blesses in its sqlite-notes
 * example. On web the database does not run, so the same fields
 * are kept in AsyncStorage under the old key instead.
 *
 * The first phone launch with empty tables imports the old
 * AsyncStorage save once, so progress made before the move is
 * kept. Every change saves again, by assignment, in the same
 * call. Nothing leaves the device.
 */
@Injectable({ providedIn: 'root' })
export class BookmarksService {
  bookmarkIds: number[] = [];
  completions: { id: number; day: string }[] = [];
  lastLessonId = 0;
  howToSeen = false;
  storageKey = 'rangular-tutorial.progress.v1';
  db: any = null;
  useSqlite = false;

  constructor() {
    this.useSqlite = Platform.OS !== 'web';
    if (this.useSqlite) {
      SQLite.openDatabaseAsync('rangular-tutorial.db').then((db) => {
        this.db = db;
        this.db.execAsync(
          'CREATE TABLE IF NOT EXISTS bookmarks (lesson_id INTEGER PRIMARY KEY); ' +
          'CREATE TABLE IF NOT EXISTS completions (lesson_id INTEGER PRIMARY KEY, day TEXT NOT NULL); ' +
          'CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)',
        ).then(() => {
          this.loadFromDb();
        });
      });
    } else {
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
  }

  loadFromDb() {
    this.db.getAllAsync('SELECT lesson_id FROM bookmarks ORDER BY lesson_id').then((rows: any) => {
      this.db.getAllAsync('SELECT lesson_id, day FROM completions ORDER BY lesson_id').then((crows: any) => {
        this.db.getAllAsync('SELECT key, value FROM settings').then((srows: any) => {
          if (rows.length === 0 && crows.length === 0 && srows.length === 0) {
            this.importOldSave();
          } else {
            this.applyRows(rows, crows, srows);
          }
        });
      });
    });
  }

  applyRows(rows: any, crows: any, srows: any) {
    this.bookmarkIds = rows.map((r: any) => r.lesson_id);
    this.completions = crows.map((r: any) => ({ id: r.lesson_id, day: r.day }));
    srows.forEach((r: any) => {
      if (r.key === 'lastLessonId') {
        this.lastLessonId = Number(r.value);
      }
      if (r.key === 'howToSeen') {
        this.howToSeen = r.value === 'true';
      }
    });
  }

  importOldSave() {
    AsyncStorage.getItem(this.storageKey).then((raw) => {
      if (raw) {
        const saved = JSON.parse(raw);
        this.bookmarkIds = saved.bookmarkIds;
        this.completions = saved.completions === undefined ? [] : saved.completions;
        this.lastLessonId = saved.lastLessonId;
        this.howToSeen = saved.howToSeen === true;
        this.save();
      }
    });
  }

  save() {
    if (this.useSqlite) {
      if (this.db) {
        this.db.execAsync('DELETE FROM bookmarks; DELETE FROM completions; DELETE FROM settings').then(() => {
          this.bookmarkIds.forEach((id) => {
            this.db.runAsync('INSERT INTO bookmarks (lesson_id) VALUES (?)', id).then(() => {});
          });
          this.completions.forEach((c) => {
            this.db.runAsync('INSERT INTO completions (lesson_id, day) VALUES (?, ?)', c.id, c.day).then(() => {});
          });
          this.db.runAsync('INSERT INTO settings (key, value) VALUES (?, ?)', 'lastLessonId', String(this.lastLessonId)).then(() => {});
          this.db.runAsync('INSERT INTO settings (key, value) VALUES (?, ?)', 'howToSeen', String(this.howToSeen)).then(() => {});
        });
      }
    } else {
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
