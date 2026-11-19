import { Component } from '@angular/core';
import { FlowerComponent } from './flower.component';

/**
 * Lesson 9's live demo: child components. The garden is the
 * parent and writes the flower tag three times. Each flower
 * is its own instance with its own bloom count, so tapping
 * Bloom in one flower moves only that flower.
 */
@Component({
  selector: 'app-child-demo',
  templateUrl: './child.component.html',
})
export class ChildDemoComponent {}
