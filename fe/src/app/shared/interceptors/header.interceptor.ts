import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CookieService} from '../services/cookie.service';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = req.url.match(/external/)
      ? sessionStorage.getItem('jwt_token')
      : this.cookieService.get('jwt_token');

    const newReq = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
    });
    return next.handle(newReq).pipe(
      map(event => {
        return event;
      })
    );
  }
}

export const HeaderInterceptor = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true
  }
];
