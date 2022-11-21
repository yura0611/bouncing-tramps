import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleSigninService {
  private auth2: gapi.auth2.GoogleAuth | undefined;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser | undefined>(1);

  constructor() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: environment.googleApp
      });
    });
  }

  public signIn(): void {
    this.auth2
      ?.signIn()
      .then(user => {
        this.subject.next(user);
      })
      .catch(err => {
        console.log(err);
        this.subject.next(undefined);
      });
  }

  public signOut(): void {
    this.auth2?.signOut().then(() => {
      this.subject.next(undefined);
    });
  }

  public Observable(): Observable<gapi.auth2.GoogleUser | undefined> {
    return this.subject.asObservable();
  }
}
