import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private cookieStore!: any;

  constructor() {
    this.parseCookies(document.cookie);
  }

  public parseCookies(cookies = document.cookie) {
    this.cookieStore = {};
    if (!!cookies === false) {
      return;
    }
    const cookiesArr = cookies.split(';');

    for (const cookie of cookiesArr) {
      const cookieArr = cookie.split('=');
      this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
    }
  }

  get(key: string) {
    if (key) {
      this.parseCookies();
      return !!this.cookieStore[key] ? this.cookieStore[key] : null;
    }
  }

  isToken(key: string): Observable<boolean> {
    const token = this.get(key);
    return token ? of(true) : of(false);
  }

  remove(key: string): void {
    if (key) {
      document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
    }
  }

  set(key: string, value: string): void {
    if (key && value) {
      document.cookie = key + '=' + (value || '');
    }
  }
}
