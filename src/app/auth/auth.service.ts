import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string) {
    return this.http.post('http://localhost:3000/auth/signin', {
      username,
      password,
    });
  }
}
