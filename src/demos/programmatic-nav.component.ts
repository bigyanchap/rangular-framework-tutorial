import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Lesson 60's live demo: programmatic navigation. The Go
 * button reads a lesson number from the input and navigates
 * from a method, not from a link. The other two buttons show
 * navigateByUrl and navigate going to fixed places. The last
 * part sends data along: the array in the console box is
 * joined into one route parameter, and the stack page it
 * opens splits the parameter back into an array and uses it.
 */
@Component({
  selector: 'app-programmatic-nav-demo',
  templateUrl: './programmatic-nav.component.html',
  styles: [`
    /* doctor: allow-hex - the console box is a deliberate dark terminal surface. */
    .console-box { background-color: #202124; border-radius: 12px; padding: 16px; }
    .console-text { color: #a8dab5; font-size: 14px; line-height: 20px; }
  `],
})
export class ProgrammaticNavDemoComponent {
  target = '';
  langs = ['Java', 'TypeScript', 'Python', 'C#'];

  constructor(private router: Router) {}

  go() {
    this.router.navigate(['/lesson', this.target]);
  }

  goHistory() {
    this.router.navigateByUrl('/history');
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  langsText() {
    return this.langs.join(', ');
  }

  goStack() {
    this.router.navigate(['/stack', this.langs.join(',')]);
  }
}
