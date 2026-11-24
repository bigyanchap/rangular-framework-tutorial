import { Component } from '@angular/core';

/**
 * Lesson 86's live demo: the file picker, both kinds.
 * The image picker reports the picked photo's name; the
 * document picker allows several at once, and the names
 * land as rows. A picked line names its result in the
 * Gmail green, bold: a confirmation should read as done.
 * A cancel emits nothing, so the lines below only ever
 * change on a real pick.
 */
@Component({
  selector: 'app-file-picker-demo',
  templateUrl: './file-picker.component.html',
  styles: [`
    .picked { color: #34a853; font-weight: 700; }
  `],
})
export class FilePickerDemoComponent {
  photo = '';
  docs: { name: string }[] = [];

  onPhoto(files: { name: string }[]) {
    this.photo = files.length ? files[0].name : '';
  }

  onDocs(files: { name: string }[]) {
    this.docs = files;
  }
}
