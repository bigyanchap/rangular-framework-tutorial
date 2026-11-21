import { Component } from '@angular/core';

/**
 * Lesson 80's live demo: pull to refresh on a list. The
 * handler sets the refreshing flag and holds it for a
 * short beat, the way a real fetch would, then lands the
 * fresh note by assignment and clears the flag: the whole
 * contract in three moves, with the spinner visible while
 * the flag is up. The count line proves the event fired,
 * in the app by a pull and in the preview by its cue.
 */
@Component({
  selector: 'app-refresh-demo',
  templateUrl: './refresh.component.html',
})
export class RefreshDemoComponent {
  refreshing = false;
  refreshCount = 0;

  notes = [
    { id: 1, title: 'Morning run', detail: 'Park loop, 25 minutes' },
    { id: 2, title: 'Reading', detail: 'Chapter 12 of the novel' },
    { id: 3, title: 'Walk', detail: 'The river road, there and back' },
  ];

  reload() {
    if (this.refreshing) return;
    this.refreshing = true;
    setTimeout(() => this.land(), 900);
  }

  land() {
    this.refreshCount++;
    this.notes = [{ id: 100 + this.refreshCount, title: 'Fresh note ' + this.refreshCount, detail: 'Pulled in by your refresh' }].concat(this.notes);
    this.refreshing = false;
  }
}
