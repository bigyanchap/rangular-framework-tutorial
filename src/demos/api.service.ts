import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

/**
 * Lesson 63's ApiService: the one place that talks to the
 * test API. The baseUrl comes from environment.ts and every
 * method builds its address from it. Components never touch
 * HttpClient themselves; they ask this service, and each
 * method hands back the call's observable for the component
 * to subscribe to.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getUser() {
    return this.http.get(this.baseUrl + '/users/1');
  }

  createUser(body: any) {
    return this.http.post(this.baseUrl + '/users', body);
  }

  updateUser(body: any) {
    return this.http.put(this.baseUrl + '/users/1', body);
  }

  deleteUser() {
    return this.http.delete(this.baseUrl + '/users/1');
  }
}
