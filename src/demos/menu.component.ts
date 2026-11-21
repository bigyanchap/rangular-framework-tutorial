import { Component } from '@angular/core';

/**
 * Lesson 68's live demo: a menu of actions for one chat
 * message. Three dots sit at the left of the bubble; tapping
 * them opens the menu. Edit swaps the bubble for a field
 * holding the message, and Save writes the field back into
 * the bubble. Delete removes the message and leaves a line
 * in its place, with a way to bring the message back so the
 * demo can be tried again. The menu is an overlay driven by
 * a boolean: [open] shows it, (close) fires when the
 * backdrop is tapped or an item is chosen, and choosing an
 * item runs its own handler first, then closes the menu.
 */
@Component({
  selector: 'app-menu-demo',
  templateUrl: './menu.component.html',
  styles: [`
    .chat-row { flex-direction: row; align-items: center; gap: 8px; }
    .dots-hit { width: 44px; height: 44px; align-items: center; justify-content: center; }
    .dots { gap: 4px; align-items: center; }
    .dot { width: 4px; height: 4px; border-radius: 9999px; background-color: #5f6368; }
    .bubble { flex: 1; background-color: #e8f0fe; border-radius: 16px; padding: 12px; gap: 4px; }
    .chat-name { font-size: 12px; font-weight: 700; color: #0b57d0; }
    .chat-text { font-size: 16px; line-height: 22px; }
    .chat-time { font-size: 12px; color: #5f6368; }
    .gone { flex: 1; font-size: 14px; color: #5f6368; }
    .edit-actions { flex-direction: row; gap: 12px; }
    .status { font-size: 14px; color: #5f6368; }
  `],
})
export class MenuDemoComponent {
  message = 'Are we still meeting at the park tomorrow morning?';
  draft = '';
  menuOpen = false;
  editing = false;
  deleted = false;
  status = '';

  openMenu() {
    this.menuOpen = true;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  startEdit() {
    this.draft = this.message;
    this.editing = true;
  }

  cancelEdit() {
    this.editing = false;
  }

  saveEdit() {
    this.message = this.draft;
    this.editing = false;
    this.status = 'The message was edited.';
  }

  remove() {
    this.deleted = true;
    this.editing = false;
    this.status = 'The message was deleted.';
  }

  restore() {
    this.deleted = false;
    this.status = '';
  }
}
