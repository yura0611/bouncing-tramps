import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ITopic} from '../models/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  constructor(private http: HttpClient) {}

  list(): Observable<ITopic[]> {
    return this.http.get<ITopic[]>(`${environment.API_ENDPOINT}/topics`);
  }
}
