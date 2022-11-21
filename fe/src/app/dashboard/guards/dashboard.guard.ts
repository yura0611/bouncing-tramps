import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from '../../shared/services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  isToken!: Observable<boolean>;
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log(this.cookieService.get('jwt_token'));
    if (this.cookieService.get('jwt_token')) {
      return true;
    }
    this.router.navigateByUrl('/signin');
    return false;
  }
}
