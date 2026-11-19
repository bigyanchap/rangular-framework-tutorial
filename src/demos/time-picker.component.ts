import { Component } from '@angular/core';

/**
 * Lesson 40's live demo: a time picker on five minute
 * steps, a datetime picker in the default combined
 * mode, and the same datetime picker again with
 * presentation="modal", so the wheels open in a centred
 * dialog instead of the bottom sheet. Every picker emits
 * the same local ISO string shape.
 */
@Component({
  selector: 'app-time-picker-demo',
  templateUrl: './time-picker.component.html',
})
export class TimePickerDemoComponent {
  at = '2026-11-13T09:00:00';
  when = '2026-11-13T09:00:00';
  whenModal = '2026-11-13T09:00:00';

  onAt(value: string) {
    this.at = value;
  }

  onWhen(value: string) {
    this.when = value;
  }

  onWhenModal(value: string) {
    this.whenModal = value;
  }
}
