import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import User from '../models/user.model';

interface newAccount {
  username: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  authUser = new BehaviorSubject<User | null>(null);
  timer: any;

  constructor(private http: HttpClient, private router: Router) {}

  authenticate(form: { username: string; password: string }) {
    return this.http
      .post<{ user: User; accessToken: string }>(
        'http://localhost:3000/auth/signin',
        {
          ...form,
        }
      )
      .pipe(
        tap((resData) => {
          this.handleAuthentication(resData.user, resData.accessToken);
        })
      );
  }

  createAccount(form: newAccount) {
    return this.http
      .post<{ user: User; accessToken: string }>(
        'http://localhost:3000/auth/signup',
        {
          ...form,
        }
      )
      .pipe(
        tap((resData) => {
          this.handleAuthentication(resData.user, resData.accessToken);
        })
      );
  }

  handleAuthentication(user: User, accessToken: string) {
    //number of miliseconds that the user will remain logged in even with refresh
    const expiresIn = 60 * 60 * 1000;
    const expireDate = new Date(new Date().getTime() + expiresIn);
    const newUser = new User(
      user.id,
      user.username,
      user.role,
      user.email,
      user.avatarId,
      accessToken,
      expireDate
    );
    this.authUser.next(newUser);
    this.autoLogOut(expiresIn);
    localStorage.setItem('userData', JSON.stringify(newUser));
  }

  autoAuthenticate() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return;
    }
    const parsedUser = JSON.parse(userData);
    const user = new User(
      parsedUser.id,
      parsedUser.username,
      parsedUser.role,
      parsedUser.email,
      parsedUser.avatarId,
      parsedUser._token,
      parsedUser._expireDate
    );

    if (user.token) {
      this.authUser.next(user);
      this.autoLogOut(
        new Date(parsedUser._expireDate).getTime() - new Date().getTime()
      );
    }
  }

  logOut() {
    this.authUser.next(null);
    localStorage.removeItem('userData');

    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = null;
  }

  autoLogOut(expirationDuration: number) {
    this.timer = setTimeout(() => {
      this.logOut();
      this.router.navigateByUrl('/');
      alert('Your session has expired. You have been logged out.');
    }, expirationDuration);
  }

  getAllUsers() {
    return this.http.get<User[]>('http://localhost:3000/auth/users');
  }
}
