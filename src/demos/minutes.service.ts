import { Injectable, signal } from '@angular/core';

/**
 * Lesson 55's reactive value: focus minutes, held as a real
 * signal. Reading is calling it; writing is set and update;
 * every reader is tracked automatically, so a write reaches
 * exactly the components whose views read the value.
 */
@Injectable({ providedIn: 'root' })
export class MinutesService {
  minutes = signal(0);

  add(amount: number) {
    this.minutes.update((m) => m + amount);
  }

  reset() {
    this.minutes.set(0);
  }
}
