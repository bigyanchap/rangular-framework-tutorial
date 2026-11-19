import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * Lesson 35's live demo: FormBuilder. The same form tree the
 * class spelling builds, written as config tuples through the
 * injected builder: a tuple is a control with validators, a
 * plain value is a control holding it.
 */
@Component({
  selector: 'app-form-builder-demo',
  templateUrl: './form-builder.component.html',
})
export class FormBuilderDemoComponent {
  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    city: 'Salem',
  });
  summary = '';

  constructor(private fb: FormBuilder) {}

  save() {
    this.summary = JSON.stringify(this.signupForm.value);
  }
}
