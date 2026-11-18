import { Injectable } from '@angular/core';

/**
 * Lesson 50's shared profile: one name and one focus,
 * written by the editor component and read by the greeter
 * component, which are siblings and pass nothing directly.
 */
@Injectable({ providedIn: 'root' })
export class ProfileService {
  name = 'friend';
  focus = 'writing';

  setName(name: string) {
    this.name = name;
  }

  setFocus(focus: string) {
    this.focus = focus;
  }
}
