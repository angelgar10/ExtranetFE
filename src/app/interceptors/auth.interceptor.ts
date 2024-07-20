import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //ToDo:Implement auth service
    const token = localStorage.getItem('token');
    if(!token)
        return next.handle(req);
    // const user = JSON.parse(localStorage.getItem('user')) as fromAuth.ResponseLogin
    // if( !user ) {
    //   return next.handle(req);
    // }

    if(req.headers.get('Authorization') === undefined || req.headers.get('Authorization') === null){
      const request = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(request);
    }
    return next.handle(req);
  }
}