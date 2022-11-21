import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IUser} from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${environment.API_ENDPOINT}/users/me`);
  }

  searchUserByEmail(email: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.API_ENDPOINT}/users?email=${email}`);
  }
}
