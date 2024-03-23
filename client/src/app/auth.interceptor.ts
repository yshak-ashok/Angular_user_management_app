import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './Services/user.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const service = inject(UserService);
  const token = service.getUserTokenFromStorage() as string;
  console.log('serverside token',token);
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  } else {
    return next(req);
  }
};
