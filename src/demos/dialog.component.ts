import { Component } from '@angular/core';

/**
 * Lesson 42's live demo: two dialogs. The confirmation asks
 * before deleting, and its buttons carry their colour roles:
 * Cancel is color="neutral", the quiet grey, and Delete is
 * color="danger", the red. The second dialog is a regular
 * modal holding a small register form; Register closes it
 * and the screen greets the new account.
 */
@Component({
  selector: 'app-dialog-demo',
  templateUrl: './dialog.component.html',
})
export class DialogDemoComponent {
  confirmOpen = false;
  noteDeleted = false;
  registerOpen = false;
  name = '';
  email = '';
  password = '';
  registered = '';

  openConfirm() {
    this.confirmOpen = true;
  }

  closeConfirm() {
    this.confirmOpen = false;
  }

  deleteNote() {
    this.confirmOpen = false;
    this.noteDeleted = true;
  }

  restore() {
    this.noteDeleted = false;
  }

  openRegister() {
    this.registerOpen = true;
  }

  closeRegister() {
    this.registerOpen = false;
  }

  register() {
    this.registerOpen = false;
    this.registered = this.name + ' (' + this.email + ')';
  }
}
