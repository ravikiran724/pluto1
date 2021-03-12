import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from 'app/service/auth-service/auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401 || error.status == 403) {
          this.authService.logOutWhenLoginError();
        }
        return throwError(error);
      })
    );
  }
}
