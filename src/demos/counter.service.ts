import { Injectable } from '@angular/core';

/**
 * Lesson 51's inner service: a counter that knows nothing
 * about reports. The report service uses it from one layer up.
 */
@Injectable({ providedIn: 'root' })
export class CounterService {
  value = 0;

  bump() {
    this.value = this.value + 1;
  }
}
