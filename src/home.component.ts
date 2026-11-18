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
 * Home, the Learn tab: a flat tint app bar that blends into the
 * status area, carrying a menu, a search action and a saved
 * shortcut. Below it, the reader's path: how far they are, and
 * the next lesson waiting. The lesson list follows in six
 * labelled groups, each row a step on the path: a green check
 * tile for a done lesson, a blue tile for the current one, a
 * pastel number for the rest. The groups are split from the one
 * lessons array in ngOnInit, because a row carries one
 * structural directive and the split belongs in the class. The
 * search filter lives in the class for the same reason.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .path-card { background-color: #e8f0fe; border-width: 0; border-radius: 16px; padding: 16px; }
    .path-continue { color: #0b57d0; font-weight: 600; }
  `],
})
export class HomeComponent {
  query = '';
  searching = false;
  results: Lesson[] = [];
  continueLesson: any = null;
  doneCount = 0;
  doneMinutes = 0;
  percent = 0;
  allDone = false;
  starterLessons: Lesson[] = [];
  batchLessons: Lesson[] = [];
  formsLessons: Lesson[] = [];
  dataLessons: Lesson[] = [];
  piecesLessons: Lesson[] = [];
  beyondLessons: Lesson[] = [];
  starterMeta = '';
  batchMeta = '';
  formsMeta = '';
  dataMeta = '';
  piecesMeta = '';
  beyondMeta = '';

  constructor(
    private lessons: LessonService,
    private bookmarks: BookmarksService,
    private shell: ShellService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.shell.setPlace('learn');
    this.starterLessons = this.lessons.lessons.filter((l: Lesson) => l.id <= 5);
    this.batchLessons = this.lessons.lessons.filter((l: Lesson) => l.id >= 6 && l.id <= 25);
    this.formsLessons = this.lessons.lessons.filter((l: Lesson) => l.id >= 26 && l.id <= 45);
    this.dataLessons = this.lessons.lessons.filter((l: Lesson) => l.id >= 46 && l.id <= 65);
    this.piecesLessons = this.lessons.lessons.filter((l: Lesson) => l.id >= 66 && l.id <= 76);
    this.beyondLessons = this.lessons.lessons.filter((l: Lesson) => l.id >= 77);
    this.refreshProgress();
  }

  refreshProgress() {
    const done = this.lessons.lessons.filter((l: Lesson) => this.bookmarks.isDone(l.id));
    this.doneCount = done.length;
    this.doneMinutes = done.reduce((sum: number, l: Lesson) => sum + parseInt(l.minutes, 10), 0);
    this.percent = Math.round((this.doneCount * 100) / 95);
    this.allDone = this.doneCount >= 95;
    const next = this.lessons.lessons.find((l: Lesson) => !this.bookmarks.isDone(l.id));
    this.continueLesson = next === undefined ? null : next;
    this.starterMeta = this.doneIn(1, 5);
    this.batchMeta = this.doneIn(6, 25);
    this.formsMeta = this.doneIn(26, 45);
    this.dataMeta = this.doneIn(46, 65);
    this.piecesMeta = this.doneIn(66, 76);
    this.beyondMeta = this.doneIn(77, 95);
  }

  doneIn(from: number, to: number) {
    const group = this.lessons.lessons.filter((l: Lesson) => l.id >= from && l.id <= to);
    const n = group.filter((l: Lesson) => this.bookmarks.isDone(l.id)).length;
    return n + ' of ' + group.length + ' done';
  }

  tileText(l: Lesson) {
    return this.bookmarks.isDone(l.id) ? '✓' : String(l.id);
  }

  tileTone(l: Lesson) {
    if (this.bookmarks.isDone(l.id)) return 'green';
    return 'varied';
  }

  isSaved(id: number) {
    return this.bookmarks.isBookmarked(id);
  }

  toggleBookmark(id: number) {
    this.bookmarks.toggle(id);
  }

  onQuery(text: string) {
    this.query = text;
    const q = text.trim().toLowerCase();
    this.searching = q.length > 0;
    if (this.searching) {
      this.results = this.lessons.lessons.filter(
        (l: Lesson) =>
          l.title.toLowerCase().includes(q) ||
          l.subtitle.toLowerCase().includes(q) ||
          l.intro.toLowerCase().includes(q),
      );
    } else {
      this.results = [];
    }
  }

  goContinue() {
    if (this.continueLesson) this.router.navigate(['/lesson', this.continueLesson.id]);
  }

  openNav() {
    this.shell.openDrawer();
  }

  pickTab(i: number) {
    if (i === 1) this.router.navigate(['/saved']);
    else if (i === 2) this.router.navigate(['/progress']);
    else if (i === 3) this.router.navigate(['/about']);
  }
}
