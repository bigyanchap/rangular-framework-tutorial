import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShellService } from './shell.service';

/**
 * The Samples tab: small, complete apps built with the same
 * Rangular pieces the lessons teach, each on its own screen.
 * The list is cards, one per sample, with a summary of what
 * the sample does and a chevron at the right; tapping a card
 * routes to the sample itself. This tab took the fourth
 * tab slot in the overhaul of 2026-11-20 (About lives in
 * the drawer): working software says more about the
 * framework than a page about it.
 */
@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styles: [`
    .sample-row { flex-direction: row; align-items: center; gap: 12px; }
    .sample-main { flex: 1; }
  `],
})
export class SamplesComponent {
  constructor(
    private shell: ShellService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.shell.setPlace('samples');
  }

  openNav() {
    this.shell.openDrawer();
  }

  pickTab(i: number) {
    if (i === 0) this.router.navigate(['/home']);
    else if (i === 1) this.router.navigate(['/saved']);
    else if (i === 2) this.router.navigate(['/history']);
  }

  goIot() {
    this.router.navigate(['/samples/iot']);
  }

  goTodo() {
    this.router.navigate(['/samples/todo']);
  }
}
