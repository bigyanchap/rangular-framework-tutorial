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
 * The Saved tab: the lessons the reader bookmarked, kept on
 * this device. The same rows as Home, with the bookmark button
 * filled; tapping it again takes the lesson off the list.
 */
@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
})
export class SavedComponent {
  savedLessons: Lesson[] = [];

  constructor(
    private lessons: LessonService,
    private bookmarks: BookmarksService,
    private shell: ShellService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.shell.setPlace('saved');
    this.refresh();
  }

  refresh() {
    this.savedLessons = this.lessons.lessons.filter((l: Lesson) => this.bookmarks.isBookmarked(l.id));
  }

  isSaved(id: number) {
    return this.bookmarks.isBookmarked(id);
  }

  toggleBookmark(id: number) {
    this.bookmarks.toggle(id);
    this.refresh();
  }

  openNav() {
    this.shell.openDrawer();
  }

  pickTab(i: number) {
    if (i === 0) this.router.navigate(['/home']);
    else if (i === 2) this.router.navigate(['/progress']);
    else if (i === 3) this.router.navigate(['/about']);
  }
}
