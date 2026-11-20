import { Component } from '@angular/core';

/**
 * Lesson 42's live demo, in the order the lesson teaches:
 * a time picker on five minute steps, a date picker that
 * picks a date and nothing else, then the datetime picker
 * in its modal. Every picker emits the same local ISO
 * string shape.
 */
@Component({
  selector: 'app-time-picker-demo',
  templateUrl: './time-picker.component.html',
})
export class TimePickerDemoComponent {
  at = '2026-11-13T09:00:00';
  day = '2026-11-13T09:00:00';
  whenModal = '2026-11-13T09:00:00';

  onAt(value: string) {
    this.at = value;
  }

  onDay(value: string) {
    this.day = value;
  }

  onWhenModal(value: string) {
    this.whenModal = value;
  }
}
