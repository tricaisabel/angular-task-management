import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.authUser.pipe(
      take(1),
      exhaustMap((user) => {
        const modifiedRequest = req.clone({
          headers: req.headers.append('Authorization', `Bearer ${user?.token}`),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
