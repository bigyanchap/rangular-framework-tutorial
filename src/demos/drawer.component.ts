import { Component } from '@angular/core';

/**
 * Lesson 69's live demo: a drawer, the full height panel
 * from the left, dressed the way a real app's drawer is:
 * a header with an avatar disc, the title and a close
 * cross at the top right, then destination rows with an
 * icon, a label and a count pill, the current destination
 * wearing the tint pill. Tapping a row sets the section
 * shown below and closes the drawer, the way tapping a
 * destination in a real app's drawer both moves you and
 * puts the panel away. The Home screen of this app uses
 * the same piece for its menu.
 */
@Component({
  selector: 'app-drawer-demo',
  templateUrl: './drawer.component.html',
  styles: [`
    .head { flex-direction: row; align-items: flex-start; justify-content: space-between; }
    .head-main { flex-direction: row; align-items: center; gap: 12px; }
    .avatar { width: 44px; height: 44px; border-radius: 9999px; background-color: #0b57d0; align-items: center; justify-content: center; }
    .avatar-letter { color: #ffffff; font-size: 20px; line-height: 24px; font-weight: 700; }
    .title { font-size: 20px; line-height: 26px; font-weight: 700; }
    .sub { font-size: 12px; line-height: 16px; color: #5f6368; }
    .nav { gap: 4px; }
    .nav-row { flex-direction: row; align-items: center; gap: 12px; padding: 12px; border-radius: 9999px; }
    .nav-on { background-color: #e8f0fe; }
    .nav-label { flex: 1; font-size: 16px; line-height: 20px; }
    .nav-label-on { color: #0b57d0; font-weight: 700; }
    .count { width: 24px; height: 24px; border-radius: 9999px; background-color: #0b57d0; align-items: center; justify-content: center; }
    .count-text { color: #ffffff; font-size: 12px; line-height: 16px; font-weight: 700; }
    .foot { font-size: 12px; line-height: 16px; color: #5f6368; }
  `],
})
export class DrawerDemoComponent {
  navOpen = false;
  section = 'Inbox';

  openNav() {
    this.navOpen = true;
  }

  closeNav() {
    this.navOpen = false;
  }

  go(name: string) {
    this.section = name;
    this.navOpen = false;
  }
}
