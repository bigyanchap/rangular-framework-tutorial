import { Component } from '@angular/core';
import { MinutesService } from './minutes.service';
import { DeviceKeyComponent } from './device-key.component';

/**
 * Lesson 55's stepper: device keys under the display. It
 * only changes the value in the service. It displays nothing
 * itself.
 */
@Component({
  selector: 'app-minutes-stepper',
  templateUrl: './minutes-stepper.component.html',
  styles: [`
    .btnrow { flex-direction: row; gap: 8px; }
  `],
})
export class MinutesStepperComponent {
  constructor(private focus: MinutesService) {}

  add15() {
    this.focus.add(15);
  }

  add30() {
    this.focus.add(30);
  }

  reset() {
    this.focus.reset();
  }
}
