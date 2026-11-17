import { Component } from '@angular/core';
import { LessonService } from './lesson.service';
import { BookmarksService } from './bookmarks.service';

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
 * Home: the gradient app bar pinned above the scroll with the
 * search pill inside it, a one time how to card the reader
 * dismisses with Got it (the same guide stays in the drawer),
 * a continue row and a bookmarks group fed by the bookmarks
 * service, and the lesson list in six labelled groups (getting
 * started, components and templates, forms and interaction,
 * services, routing, and data, the Material pieces, then
 * beyond Angular). Every lesson row carries its number tile
 * and its own bookmark button. The groups are
 * split from the one lessons array in ngOnInit, because a row
 * carries one structural directive and the split belongs in
 * the class. The search filter lives in the class for the
 * same reason.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  menuOpen = false;
  howToSeen = false;
  howToOpen = false;
  query = '';
  searching = false;
  results: Lesson[] = [];
  continueLesson: any = null;
  bookmarkLessons: Lesson[] = [];
  starterLessons: Lesson[] = [];
  batchLessons: Lesson[] = [];
  formsLessons: Lesson[] = [];
  dataLessons: Lesson[] = [];
  piecesLessons: Lesson[] = [];
  beyondLessons: Lesson[] = [];

  constructor(
    private lessons: LessonService,
    private bookmarks: BookmarksService,
  ) {}

  ngOnInit() {
    this.starterLessons = this.lessons.lessons.filter((l: Lesson) => l.id <= 5);
    this.batchLessons = this.lessons.lessons.filter((l: Lesson) => l.id >= 6 && l.id <= 25);
    this.formsLessons = this.lessons.lessons.filter((l: Lesson) => l.id >= 26 && l.id <= 45);
    this.dataLessons = this.lessons.lessons.filter((l: Lesson) => l.id >= 46 && l.id <= 65);
    this.piecesLessons = this.lessons.lessons.filter((l: Lesson) => l.id >= 66 && l.id <= 76);
    this.beyondLessons = this.lessons.lessons.filter((l: Lesson) => l.id >= 77);
    if (this.bookmarks.lastLessonId > 0) {
      const found = this.lessons.lessons.find((l: Lesson) => l.id === this.bookmarks.lastLessonId);
      this.continueLesson = found === undefined ? null : found;
    }
    this.bookmarkLessons = this.lessons.lessons.filter((l: Lesson) => this.bookmarks.isBookmarked(l.id));
    this.howToSeen = this.bookmarks.howToSeen;
  }

  isSaved(id: number) {
    return this.bookmarks.isBookmarked(id);
  }

  toggleBookmark(id: number) {
    this.bookmarks.toggle(id);
    this.bookmarkLessons = this.lessons.lessons.filter((l: Lesson) => this.bookmarks.isBookmarked(l.id));
  }

  dismissHowTo() {
    this.bookmarks.dismissHowTo();
    this.howToSeen = true;
  }

  openHowTo() {
    this.menuOpen = false;
    this.howToOpen = true;
  }

  closeHowTo() {
    this.howToOpen = false;
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

  clearSearch() {
    this.onQuery('');
  }

  openMenu() {
    this.menuOpen = true;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
