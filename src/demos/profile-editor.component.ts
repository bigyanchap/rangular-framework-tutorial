import { Component } from '@angular/core';
import { ProfileService } from './profile.service';

/**
 * Lesson 52's editor: it drafts locally, then saves into the
 * shared profile service. Its drafts start from whatever the
 * service currently holds.
 */
@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
})
export class ProfileEditorComponent {
  nameDraft = '';
  focusDraft = '';

  constructor(private profile: ProfileService) {}

  ngOnInit() {
    this.nameDraft = this.profile.name;
    this.focusDraft = this.profile.focus;
  }

  save() {
    this.profile.setName(this.nameDraft);
    this.profile.setFocus(this.focusDraft);
  }
}
