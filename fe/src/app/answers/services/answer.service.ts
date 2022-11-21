import {IAnswer} from '../models/answer.interface';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  constructor(private http: HttpClient) {}

  evaluate(id: IAnswer['_id'], mark: Partial<IAnswer>): Observable<IAnswer> {
    return this.http.patch<IAnswer>(`${environment.API_ENDPOINT}/answers/${id}`, mark);
  }

  candidateAnswers(id: IAnswer['_id']): Observable<IAnswer[]> {
    return this.http.get<IAnswer[]>(`${environment.API_ENDPOINT}/answers/?applicationId=${id}`);
  }
}
