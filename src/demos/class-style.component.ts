import { Component } from '@angular/core';

/**
 * Lesson 8's live demo: class and style bindings, honestly,
 * told through the garden that lessons 8 to 11 share.
 * A [class.name] binding over a class declared in the component
 * styles is wired and toggles live, so the flower bed line below
 * uses it. The whole-object forms ([class], [ngClass], [style],
 * [ngStyle]) are not wired; the compiler warns about them
 * (GEN_CLASS_BINDING, GEN_STYLE_BINDING) instead of staying
 * silent. For a whole look change, named classes in the
 * component styles with ngIf swapping which pre-styled line
 * shows is the pattern, and the three look lines use it. The
 * try it field at the end renders your own words in all three
 * looks at once, so the classes are visible side by side.
 */
@Component({
  selector: 'app-class-style-demo',
  templateUrl: './class-style.component.html',
  styles: [`
    .look-sunny { color: #b07d10; font-weight: 700; }
    .look-rainy { color: #546e7a; }
    .look-big { font-size: 20px; font-weight: 600; }
    .look-highlight { background-color: #fef7e0; }
  `],
})
export class ClassStyleDemoComponent {
  look = 'sunny';
  highlighted = false;
  ownLine = 'My own flower';

  show(look: string) {
    this.look = look;
  }

  toggleHighlight() {
    this.highlighted = !this.highlighted;
  }
}
