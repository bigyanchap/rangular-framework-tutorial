import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * The language stack page: lesson 60's array destination.
 * It is a brand new page with one job: receive the array
 * that rode in its route parameter, rebuild it, and put
 * it to use. The parameter is one string, so ngOnInit
 * splits it back into the list, counts it, and reads
 * its first and last entries.
 */
@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
})
export class StackComponent {
  langs: string[] = [];
  first = '';
  last = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.params.langs;
    this.langs = raw ? raw.split(',') : [];
    if (this.langs.length > 0) {
      this.first = this.langs[0];
      this.last = this.langs[this.langs.length - 1];
    }
  }

  goBack() {
    this.router.navigate(['/lesson', 60]);
  }
}
