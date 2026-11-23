import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Lesson 36's live demo: FormArray. A members list inside the
 * team group: each row is a control, rows are pushed and removed
 * while the form runs, and the group value shows the list as an
 * array. Each row's textbox is narrowed to leave room at its
 * right for a red delete icon, which removes that row. The icon
 * sits in a 48 square of its own, dropped 16px from the row top
 * so the square's centre lands exactly on the textbox's centre,
 * and the icon is centred inside the square both ways.
 */
@Component({
  selector: 'app-form-array-demo',
  templateUrl: './form-array.component.html',
  styles: [`
    .member-row { flex-direction: row; gap: 8px; }
    .member-field { flex: 1; }
    .member-del { width: 48px; height: 48px; margin-top: 16px; align-items: center; justify-content: center; }
  `],
})
export class FormArrayDemoComponent {
  teamForm = new FormGroup({
    team: new FormControl('', Validators.required),
    members: new FormArray([
      new FormControl('', Validators.required),
      new FormControl('Ana'),
    ]),
  });
  summary = '';

  addMember() {
    (this.teamForm.get('members') as FormArray).push(new FormControl('', Validators.required));
  }

  removeMember(i: number) {
    (this.teamForm.get('members') as FormArray).removeAt(i);
  }

  save() {
    this.summary = JSON.stringify(this.teamForm.value);
  }
}
