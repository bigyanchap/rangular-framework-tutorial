import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * The device key shared by the Pattern A demos (lessons 53,
 * 54, 55, 66 and 67): the chunky key of a small instrument,
 * sitting under the lesson's display panel, so panel and
 * keys read as one device. The face is the surface colour
 * with a hairline edge, resting on a bronze base band that
 * reads as the key's thick bottom edge. The value or word
 * sits large on the face, with a short label in whole words
 * under it. A press dips the key: the face sinks into the
 * base for a moment, the way a real key goes down.
 */
@Component({
  selector: 'app-device-key',
  templateUrl: './device-key.component.html',
  styles: [`
    .base { background-color: #a06a35; border-radius: 12px; padding-bottom: 4px; width: 84px; }
    .base-compact { width: 64px; }
    .base-dipped { padding-top: 4px; padding-bottom: 0px; }
    .face { background-color: #ffffff; border-width: 1px; border-color: #d8c9ae; border-radius: 12px; padding: 8px; }
    .glyph { font-size: 20px; font-weight: 700; text-align: center; }
    .klabel { font-size: 12px; text-align: center; color: #6b5d43; }
  `],
})
export class DeviceKeyComponent {
  @Input() glyph = '';
  @Input() label = '';
  @Input() compact = false;
  @Output() pressed = new EventEmitter<void>();

  dipped = false;

  press() {
    this.dipped = true;
    this.pressed.emit();
    setTimeout(() => {
      this.dipped = false;
    }, 150);
  }
}
