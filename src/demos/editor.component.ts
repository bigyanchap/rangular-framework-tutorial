import { Component } from '@angular/core';

/**
 * Lesson 96's live demo: the block editor. The seed value
 * carries one block per line: a title, a body line with three
 * inline marks, two checklist items, a bullet and a numbered
 * line. The button appends one more bullet block by
 * assignment, and the count line reports how many blocks the
 * note holds.
 */
@Component({
  selector: 'app-editor-demo',
  templateUrl: './editor.component.html',
})
export class EditorDemoComponent {
  notes = '# Morning pages\nSaw the **sunrise** again, and the air was *clear* and ++quiet++.\n- [x] Walked the river road\n- [ ] Took photos\n- Evening walk\n1. Read one chapter';

  onNotes(v: string) {
    this.notes = v;
  }

  addLine() {
    this.notes = this.notes + '\n- Evening walk';
  }

  blockCount() {
    return this.notes.split('\n').length;
  }
}
