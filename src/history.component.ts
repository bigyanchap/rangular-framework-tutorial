import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LessonService } from './lesson.service';
import { BookmarksService } from './bookmarks.service';
import { ShellService } from './shell.service';

type Lesson = {
  id: number;
  title: string;
  subtitle: string;
  minutes: string;
  intro: string;
  code: string;
  tip: string;
};

/**
 * The History tab: where the reader has been, and how far
 * they have come. The five lessons visited most recently sit
 * first, read from the visit list the lesson screen records;
 * the progress story follows under it: the percent of the
 * path, the minutes in, this week's minutes as bars, and each
 * section's bar. Progress is framed as progress, never as a
 * streak. This tab replaced the old Progress tab in the
 * samples overhaul (2026-11-20): the visits were the part of
 * progress the reader actually looks for, so they lead.
 */
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styles: [`
    .path-card { background-color: #e8f0fe; border-width: 0; border-radius: 16px; padding: 16px; }
    .stat-row { flex-direction: row; gap: 12px; }
    .stat-tile { flex: 1; }
  `],
})
export class HistoryComponent {
  recentLessons: Lesson[] = [];
  doneCount = 0;
  doneMinutes = 0;
  percent = 0;
  savedCount = 0;
  weekData: any[] = [];
  groups: any[] = [];

  constructor(
    private lessons: LessonService,
    private bookmarks: BookmarksService,
    private shell: ShellService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.shell.setPlace('history');
    this.recentLessons = this.bookmarks.recentIds
      .slice(0, 5)
      .map((id: number) => this.lessons.lessons.find((l: Lesson) => l.id === id))
      .filter((l: any) => l !== undefined);
    const done = this.lessons.lessons.filter((l: Lesson) => this.bookmarks.isDone(l.id));
    this.doneCount = done.length;
    this.doneMinutes = done.reduce((sum: number, l: Lesson) => sum + parseInt(l.minutes, 10), 0);
    this.percent = Math.round((this.doneCount * 100) / 98);
    this.savedCount = this.bookmarks.bookmarkIds.length;
    this.weekData = [6, 5, 4, 3, 2, 1, 0].map((off: number) => ({
      label: this.dayLabel(off),
      value: this.dayMinutes(off),
    }));
    this.groups = [
      this.groupStat('Getting started', 1, 5),
      this.groupStat('Components and templates', 6, 25),
      this.groupStat('Forms and interaction', 26, 47),
      this.groupStat('Services, routing, and data', 48, 67),
      this.groupStat('The Material pieces', 68, 78),
      this.groupStat('Beyond Angular', 79, 98),
    ];
  }

  minutesOf(id: number) {
    const found = this.lessons.lessons.find((l: Lesson) => l.id === id);
    return found === undefined ? 0 : parseInt(found.minutes, 10);
  }

  dayLabel(offset: number) {
    return this.bookmarks.weekdayLetter(offset);
  }

  dayMinutes(offset: number) {
    const day = this.bookmarks.dayKey(offset);
    return this.bookmarks.completions
      .filter((c) => c.day === day)
      .reduce((sum: number, c) => sum + this.minutesOf(c.id), 0);
  }

  groupStat(label: string, from: number, to: number) {
    const inGroup = this.lessons.lessons.filter((l: Lesson) => l.id >= from && l.id <= to);
    const done = inGroup.filter((l: Lesson) => this.bookmarks.isDone(l.id)).length;
    return {
      label,
      done,
      total: inGroup.length,
      pct: inGroup.length === 0 ? 0 : Math.round((done * 100) / inGroup.length),
    };
  }

  openNav() {
    this.shell.openDrawer();
  }

  pickTab(i: number) {
    if (i === 0) this.router.navigate(['/home']);
    else if (i === 1) this.router.navigate(['/saved']);
    else if (i === 3) this.router.navigate(['/samples']);
  }
}
