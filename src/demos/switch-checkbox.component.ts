import { Component } from '@angular/core';

/**
 * Lesson 18's live demo: switch and checkbox. Each control
 * takes its value from a field through [checked] and reports
 * changes through (change); the handlers only store the new
 * value, and the lines below read the fields.
 */
@Component({
  selector: 'app-switch-checkbox-demo',
  templateUrl: './switch-checkbox.component.html',
})
export class SwitchCheckboxDemoComponent {
  wifiOn = true;
  notifications = false;
  sounds = true;
  hapticOn = true;
  silentOn = false;
  greenOn = true;

  onWifi(value: boolean) {
    this.wifiOn = value;
  }

  onNotifications(value: boolean) {
    this.notifications = value;
  }

  onSounds(value: boolean) {
    this.sounds = value;
  }

  onHaptic(value: boolean) {
    this.hapticOn = value;
  }

  onSilent(value: boolean) {
    this.silentOn = value;
  }

  onGreen(value: boolean) {
    this.greenOn = value;
  }

  onCount() {
    return (this.wifiOn ? 1 : 0) + (this.notifications ? 1 : 0) + (this.sounds ? 1 : 0);
  }
}
