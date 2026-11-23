import { Component } from '@angular/core';

/**
 * Lesson 46's live demo: autocomplete on an ordinary
 * input. The options are a string array in the class; a
 * pick writes back through ngModel and is also reported
 * through (optionSelected). The demo wears the tint band
 * dress: the field sits in a light blue band under a
 * "Move this mail" title, and the whole folder list shows
 * under it as chips, the picked folder's chip filled blue.
 * A chip tap chooses that folder, the same pick the
 * suggestion panel makes.
 */
@Component({
  selector: 'app-autocomplete-demo',
  templateUrl: './autocomplete.component.html',
  styles: [`
    .band { background-color: #e8f0fe; border-radius: 16px; padding: 16px; gap: 12px; }
    .band-title { flex-direction: row; align-items: center; gap: 8px; }
    .band-title-text { font-size: 16px; font-weight: 700; }
    .folders { gap: 4px; margin-top: 16px; }
    .folders-label { font-size: 14px; font-weight: 600; color: #5f6368; }
    .chip { border-width: 1px; border-color: #bdc1c6; border-radius: 9999px; padding: 8px; }
    .chip-on { background-color: #0b57d0; border-color: #0b57d0; }
    .chip-text { font-size: 14px; color: #3c4043; }
    .chip-text-on { color: #ffffff; font-weight: 600; }
  `],
})
export class AutocompleteDemoComponent {
  folder = '';
  folders = ['Inbox', 'Starred', 'Sent', 'Drafts', 'Archive', 'Spam', 'Trash'];
  picked = '';

  onPick(value: string) {
    this.picked = value;
  }

  choose(name: string) {
    this.folder = name;
    this.picked = name;
  }
}
