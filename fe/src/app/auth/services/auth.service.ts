import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ILoginResponse} from '../models/login-responce.interfase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logIn(token: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${environment.API_ENDPOINT}/auth/login`, {token});
  }
}
