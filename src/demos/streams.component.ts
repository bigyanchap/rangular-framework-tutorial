import { Component } from '@angular/core';
import { BehaviorSubject, Subject, scan } from 'rxjs';

/**
 * Lesson 100's live demo: streams the component makes itself.
 * A Subject counts taps through the scan operator, the count
 * landing in a field through a subscription made in ngOnInit.
 * A BehaviorSubject holds the current mood: the template
 * reads it with the async pipe, and a second subscription
 * mirrors it into a field, so both ways of reading a stream
 * sit side by side.
 */
@Component({
  selector: 'app-streams-demo',
  templateUrl: './streams.component.html',
  styles: [`
    .panel { border-width: 1px; border-color: #a06a35; border-radius: 12px; padding: 12px; background-color: #fdf6ec; }
    .count { font-size: 24px; font-weight: 700; }
    .btnrow { flex-direction: row; gap: 8px; }
  `],
})
export class StreamsDemoComponent {
  taps = new Subject<number>();
  mood = new BehaviorSubject<string>('Calm');
  tapCount = 0;
  lastMood = '';

  ngOnInit() {
    this.taps.pipe(scan((n: number) => n + 1, 0)).subscribe((n: number) => { this.tapCount = n; });
    this.mood.subscribe((m: string) => { this.lastMood = m; });
  }

  tap() {
    this.taps.next(1);
  }

  setMood(m: string) {
    this.mood.next(m);
  }
}
