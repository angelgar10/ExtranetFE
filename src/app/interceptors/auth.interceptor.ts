import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  let authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.token}`
    }
  });
  
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((newToken: string) => {
            authService.setToken(newToken);
            authReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(authReq);
          }),
          catchError(err => {
            authService.logout();
            return throwError(err);
          })
        );
      }
      return throwError(error);
    })
  );
};