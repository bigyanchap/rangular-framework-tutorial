import { Component } from '@angular/core';
import { FlowerPickComponent } from './flower-pick.component';

/**
 * Lesson 11's live demo: outputs. Two flower cards receive
 * their name through an input and report each pick through
 * the picked output. The garden counts the picks and keeps
 * the last flower name the event carried.
 */
@Component({
  selector: 'app-outputs-demo',
  templateUrl: './outputs.component.html',
})
export class OutputsDemoComponent {
  flowers = ['Sunflower', 'Rose'];
  pickCount = 0;
  lastPicked = '';

  recordPick(name: string) {
    this.pickCount++;
    this.lastPicked = name;
  }
}
