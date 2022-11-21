import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from '../../shared/services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  isToken!: Observable<boolean>;

  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    this.isToken = this.cookieService.get('jwt_token');
    if (this.isToken) {
      this.router.navigateByUrl('/vacancies');
      return false;
    }
    return true;
  }
}
