import { Component } from '@angular/core';

/**
 * Lesson 41's live demo: a bottom sheet holding an alarm
 * set page, the kind of short task a sheet is for. The
 * sheet is declarative: [open] shows it, (close) fires
 * from the backdrop or from Cancel, and Save reads the
 * page's fields and prints the alarm on the screen.
 */
@Component({
  selector: 'app-sheet-demo',
  templateUrl: './sheet.component.html',
})
export class SheetDemoComponent {
  sheetOpen = false;
  time = '2026-11-13T06:30:00';
  label = 'Wake up';
  sound = 'bell';
  vibrate = true;
  alarm = '';

  openSheet() {
    this.sheetOpen = true;
  }

  closeSheet() {
    this.sheetOpen = false;
  }

  onTime(value: string) {
    this.time = value;
  }

  onSound(value: string) {
    this.sound = value;
  }

  onVibrate(value: boolean) {
    this.vibrate = value;
  }

  save() {
    this.sheetOpen = false;
    this.alarm = this.label + ', sound ' + this.sound + ', vibrate ' + (this.vibrate ? 'on' : 'off');
  }
}
