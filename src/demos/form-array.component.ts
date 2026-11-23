import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Lesson 36's live demo: FormArray. A members list inside the
 * team group: each row is a control, rows are pushed and removed
 * while the form runs, and the group value shows the list as an
 * array. Each row's textbox is narrowed to leave room at its
 * right for a delete icon button, which removes that row.
 */
@Component({
  selector: 'app-form-array-demo',
  templateUrl: './form-array.component.html',
  styles: [`
    .member-row { flex-direction: row; align-items: center; gap: 8px; }
    .member-field { flex: 1; }
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
