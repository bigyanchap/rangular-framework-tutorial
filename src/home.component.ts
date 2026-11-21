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
 * shortcut. Below it, the last lesson the reader visited, one
 * tap from opening again. The lesson list follows in six
 * labelled groups, each row a step on the path: a green check
 * tile for a done lesson, a blue tile for the current one, a
 * pastel number for the rest. The groups are split from the one
 * lessons array in ngOnInit, because a row carries one
 * structural directive and the split belongs in the class. The
 * search filter lives in the class for the same reason: it
 * matches the words in a title, subtitle or intro, and the
 * lesson number too, so typing 41 lands on lesson 41.
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
  resetOpen = false;
  results: Lesson[] = [];
  lastLesson: any = null;
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
    this.formsLessons = this.lessons.lessons.filter((l: Lesson) => l.id >= 26 && l.id <= 47);
    this.dataLessons = this.lessons.lessons.filter((l: Lesson) => l.id >= 48 && l.id <= 67);
    this.piecesLessons = this.lessons.lessons.filter((l: Lesson) => l.id >= 68 && l.id <= 78);
    this.beyondLessons = this.lessons.lessons.filter((l: Lesson) => l.id >= 79);
    this.refreshProgress();
  }

  refreshProgress() {
    const lastId = this.bookmarks.recentIds.length > 0 ? this.bookmarks.recentIds[0] : this.bookmarks.lastLessonId;
    const found = this.lessons.lessons.find((l: Lesson) => l.id === lastId);
    this.lastLesson = found === undefined ? null : found;
    this.starterMeta = this.doneIn(1, 5);
    this.batchMeta = this.doneIn(6, 25);
    this.formsMeta = this.doneIn(26, 47);
    this.dataMeta = this.doneIn(48, 67);
    this.piecesMeta = this.doneIn(68, 78);
    this.beyondMeta = this.doneIn(79, 97);
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
          String(l.id).indexOf(q) === 0 ||
          l.title.toLowerCase().includes(q) ||
          l.subtitle.toLowerCase().includes(q) ||
          l.intro.toLowerCase().includes(q),
      );
    } else {
      this.results = [];
    }
  }

  goLastVisited() {
    if (this.lastLesson) this.router.navigate(['/lesson', this.lastLesson.id]);
    else this.router.navigate(['/lesson', 1]);
  }

  openNav() {
    this.shell.openDrawer();
  }

  askReset() {
    this.resetOpen = true;
  }

  cancelReset() {
    this.resetOpen = false;
  }

  confirmReset() {
    this.bookmarks.resetChecks();
    this.resetOpen = false;
    this.refreshProgress();
  }

  pickTab(i: number) {
    if (i === 1) this.router.navigate(['/saved']);
    else if (i === 2) this.router.navigate(['/history']);
    else if (i === 3) this.router.navigate(['/samples']);
  }
}
