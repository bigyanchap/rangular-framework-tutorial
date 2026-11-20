import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShellService } from './shell.service';

/**
 * The Samples tab: small, complete apps built with the same
 * Rangular pieces the lessons teach, each on its own screen.
 * The list is cards, one per sample, with a summary of what
 * the sample does and a chevron at the right; tapping a card
 * routes to the sample itself. This tab replaced the About
 * tab in the samples overhaul (2026-11-20): working software
 * says more about the framework than a page about it.
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

  goAlarm() {
    this.router.navigate(['/samples/alarm']);
  }

  goMario() {
    this.router.navigate(['/samples/mario']);
  }

  goHabit() {
    this.router.navigate(['/samples/habit']);
  }
}
