import { Component } from '@angular/core';

/**
 * Lesson 8's live demo: class and style bindings, honestly,
 * told through the garden that lessons 8 to 11 share.
 * A [class.name] binding over a class declared in the component's
 * CSS file is wired and toggles live, so the flower bed line below
 * uses it. The whole-object forms ([class], [ngClass], [style],
 * [ngStyle]) are not wired; the compiler warns about them
 * (GEN_CLASS_BINDING, GEN_STYLE_BINDING) instead of staying
 * silent. For a whole look change, named classes in the
 * CSS file with ngIf swapping which pre-styled line
 * shows is the pattern, and the three look lines use it. The
 * try it field at the end renders your own words in all three
 * looks at once, so the classes are visible side by side.
 */
@Component({
  selector: 'app-class-style-demo',
  templateUrl: './class-style.component.html',
  styleUrls: ['./class-style.component.css'],
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
