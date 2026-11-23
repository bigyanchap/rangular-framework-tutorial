import { Component, computed } from '@angular/core';
import { MinutesService } from './minutes.service';

/**
 * Lesson 55's display: the demo's display panel, at the top.
 * It reads the minutes signal from the service by calling
 * it, and derives the hours text and the state line with
 * computed(): each derivation is worked out only when read,
 * only again when the minutes changed, and never stored as
 * a second copy that could disagree with the source.
 */
@Component({
  selector: 'app-minutes-display',
  templateUrl: './minutes-display.component.html',
  styles: [`
    .panel { border-width: 1px; border-color: #a06a35; border-radius: 12px; padding: 12px; background-color: #fdf6ec; }
  `],
})
export class MinutesDisplayComponent {
  hours = computed(() => {
    const m = this.focus.minutes();
    return (m - (m % 60)) / 60 + 'h ' + (m % 60) + 'm';
  });

  stateLine = computed(() =>
    this.focus.minutes() >= 60 ? 'Past an hour of focus.' : 'Under an hour so far.');

  constructor(private focus: MinutesService) {}
}
