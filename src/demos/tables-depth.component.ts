import { Component } from '@angular/core';

/**
 * Lesson 76's live demo: sorting and paging, in depth.
 * The table above sorts and pages its own copy of the
 * rows. The list below renders the bound array itself, in
 * its own order, and it never changes while you sort:
 * proof the table leaves your data alone. Add and remove
 * rows by assignment, and watch the pager appear while
 * the rows overflow one page and vanish when they fit.
 */
@Component({
  selector: 'app-tables-depth-demo',
  templateUrl: './tables-depth.component.html',
})
export class TablesDepthDemoComponent {
  people = [
    { name: 'Emma', age: 31, city: 'London' },
    { name: 'Liam', age: 25, city: 'Toronto' },
    { name: 'Sofia', age: 40, city: 'Sydney' },
    { name: 'Noah', age: 25, city: 'London' },
    { name: 'Ava', age: 36, city: 'Berlin' },
    { name: 'Lucas', age: 29, city: 'Toronto' },
    { name: 'Mia', age: 33, city: 'Sydney' },
  ];
  extras = [
    { name: 'Hari', age: 27, city: 'Dharan' },
    { name: 'Gita', age: 38, city: 'Butwal' },
    { name: 'Nabin', age: 24, city: 'Hetauda' },
  ];
  added = 0;

  addPerson() {
    this.people = [...this.people, this.extras[this.added]];
    this.added = this.added + 1;
  }

  removeLast() {
    this.people = this.people.slice(0, this.people.length - 1);
  }
}
