import { Component } from '@angular/core';

/**
 * Lesson 14's live demo: template reference variables. The
 * input carries ngModel, and the #nameField ref reads as the
 * ngModel, so the console above the field can ask the ref for
 * valid, touched and dirty while you type. The three flags
 * move at different moments: dirty flips on the first
 * keystroke, valid flips when the name reaches three
 * characters, and touched flips only when the field loses
 * focus. ngModel itself is taught in full in the forms batch;
 * here the ref is the star.
 */
@Component({
  selector: 'app-refs-demo',
  templateUrl: './refs.component.html',
  styles: [`
    /* doctor: allow-hex - the console box is a deliberate dark terminal surface. */
    .console-box { background-color: #202124; border-radius: 12px; padding: 16px; }
    .console-text { color: #a8dab5; font-size: 14px; line-height: 20px; }
  `],
})
export class RefsDemoComponent {
  name = '';
}
