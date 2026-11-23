import { Component } from '@angular/core';
import { MinutesStepperComponent } from './minutes-stepper.component';
import { MinutesDisplayComponent } from './minutes-display.component';

/**
 * Lesson 55's live demo: real Angular signals. The reactive
 * value is a signal() in a service, the stepper writes it
 * with update(), and the display derives its lines with
 * computed(). One source, tracked automatically.
 */
@Component({
  selector: 'app-signals-demo',
  templateUrl: './signals.component.html',
})
export class SignalsDemoComponent {}
