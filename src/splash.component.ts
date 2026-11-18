import { Component } from '@angular/core';

/**
 * The entry: a real welcome, not a plain splash. The code mark,
 * what Rangular is in one line, a real component as the proof,
 * and one way in. No account, nothing to tap but Start.
 */
@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styles: [`
    .entry-mark { width: 64px; height: 64px; border-radius: 16px; background-color: #0b57d0; align-items: center; justify-content: center; }
    .entry-foot { color: #5f6368; }
    .entry-stats { color: #5f6368; }
  `],
})
export class SplashComponent {
  snippet = "@Component({\n  selector: 'app-home',\n  templateUrl: './home.html'\n})\nexport class HomeComponent {\n  title = 'My first app';\n}";
}
