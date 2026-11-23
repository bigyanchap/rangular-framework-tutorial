import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from './api.service';

/**
 * Lesson 63's live demo: asking the network through an
 * ApiService. The component receives the service in its
 * constructor and makes the first call right there, so the
 * screen can never run half wired. load() reads one user
 * from JSONPlaceholder, a public test API, and shapes the
 * answer with the map operator before subscribing;
 * create(), update() and remove() carry the writing verbs
 * in the same subscribe shape. In the browser preview the
 * client is a stub that never answers, so the demo waits
 * at Loading there; on a phone with a connection the
 * request is genuine.
 */
@Component({
  selector: 'app-http-basics-demo',
  templateUrl: './http-basics.component.html',
})
export class HttpBasicsDemoComponent {
  name = '';
  email = '';
  city = '';
  loading = false;
  failed = '';

  constructor(private api: ApiService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.failed = '';
    this.api.getUser()
      .pipe(map((data: any) => ({ name: data.name, email: data.email, city: data.address.city })))
      .subscribe(
      (user) => {
        this.name = user.name;
        this.email = user.email;
        this.city = user.city;
        this.loading = false;
      },
      (err) => {
        this.failed = 'The request failed. Check the connection and try again.';
        this.loading = false;
      },
    );
  }

  create() {
    const body = { name: 'Asha Verma', email: 'asha@example.com' };
    this.loading = true;
    this.failed = '';
    this.api.createUser(body).subscribe(
      (data) => {
        this.name = data.name;
        this.email = data.email;
        this.city = '';
        this.loading = false;
      },
      (err) => {
        this.failed = 'The request failed. Check the connection and try again.';
        this.loading = false;
      },
    );
  }

  update() {
    const body = {
      name: 'Leanne Graham',
      email: 'leanne@example.com',
      address: { city: 'Gwenborough' },
    };
    this.loading = true;
    this.failed = '';
    this.api.updateUser(body).subscribe(
      (data) => {
        this.name = data.name;
        this.email = data.email;
        this.city = data.address.city;
        this.loading = false;
      },
      (err) => {
        this.failed = 'The request failed. Check the connection and try again.';
        this.loading = false;
      },
    );
  }

  remove() {
    this.loading = true;
    this.failed = '';
    this.api.deleteUser().subscribe(
      () => {
        this.name = '';
        this.email = '';
        this.city = '';
        this.loading = false;
      },
      (err) => {
        this.failed = 'The request failed. Check the connection and try again.';
        this.loading = false;
      },
    );
  }
}
