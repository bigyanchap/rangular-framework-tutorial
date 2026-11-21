import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShellService } from './shell.service';

/**
 * The Samples tab: small, complete apps built with the same
 * Rangular pieces the lessons teach, each on its own screen.
 * The list is cards, one per sample: an icon in a tinted
 * circle at the left, a summary of what the sample does,
 * and a chevron in a tinted circle at the right, the row
 * language of the samples dress-up of 2026-11-21; tapping
 * a card routes to the sample itself. This tab took the fourth
 * tab slot in the overhaul of 2026-11-20 (About lives in
 * the drawer): working software says more about the
 * framework than a page about it.
 */
@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styles: [`
    .sample-row { flex-direction: row; align-items: flex-start; gap: 12px; }
    .sample-main { flex: 1; }
    .sample-ic { width: 44px; height: 44px; border-radius: 9999px; background-color: #e8f0fe; align-items: center; justify-content: center; }
    .sample-chev { width: 28px; height: 28px; border-radius: 9999px; background-color: #e8f0fe; align-items: center; justify-content: center; }
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

  goAlarm() {
    this.router.navigate(['/samples/alarm']);
  }
}
