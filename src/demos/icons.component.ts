import { Component } from '@angular/core';

/**
 * Lesson 20's live demo: icons. The full fixed set, each name
 * checked at compile time, then a few icons at work with sizes
 * and colour roles, and icon buttons that report the last tap.
 */
@Component({
  selector: 'app-icons-demo',
  templateUrl: './icons.component.html',
  styles: [`
    .icon-cell { align-items: center; gap: 4px; padding: 8px; }
    .icon-line { flex-direction: row; align-items: center; gap: 12px; padding: 8px; }
  `],
})
export class IconsDemoComponent {
  names = ['alarm', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'bell', 'bookmark', 'bookmark-outline', 'calendar', 'camera', 'chart', 'chat', 'check', 'check-circle', 'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up', 'close', 'code', 'copy', 'dark-mode', 'delete', 'download', 'edit', 'error', 'file', 'filter', 'folder', 'group', 'heart', 'heart-outline', 'help', 'history', 'home', 'image', 'info', 'language', 'link', 'location', 'lock', 'login', 'logout', 'mail', 'menu', 'mic', 'minus', 'more-horiz', 'more-vert', 'pause', 'person', 'play', 'plus', 'print', 'redo', 'refresh', 'save', 'schedule', 'school', 'search', 'send', 'settings', 'share', 'sort', 'star', 'star-outline', 'sun', 'thumb-up', 'timer', 'tune', 'undo', 'upload', 'visibility', 'visibility-off', 'volume', 'warning', 'wifi', 'work'];
  lastTap = '';

  tapIcon(name: string) {
    this.lastTap = name;
  }
}
