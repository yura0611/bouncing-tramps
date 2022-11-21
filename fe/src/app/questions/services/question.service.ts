import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IQuestion} from '../models/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  public buttonClickEventTrack = new Subject();

  update(id: IQuestion['_id'], question: Partial<IQuestion>): Observable<IQuestion> {
    return this.http.patch<IQuestion>(`${environment.API_ENDPOINT}/questions/${id}`, question);
  }

  list(): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${environment.API_ENDPOINT}/questions`);
  }

  create(question: IQuestion): Observable<IQuestion> {
    return this.http.post<IQuestion>(`${environment.API_ENDPOINT}/questions`, question);
  }

  canEdit(id: IQuestion['_id']): Observable<boolean> {
    return this.http.get<boolean>(`${environment.API_ENDPOINT}/questions/${id}/can-edit`);
  }

  one(id: IQuestion['_id']): Observable<IQuestion> {
    return this.http.get<IQuestion>(`${environment.API_ENDPOINT}/questions/${id}`);
  }

  specific(id: IQuestion['_id']) {
    return this.http.get<IQuestion[]>(`${environment.API_ENDPOINT}/questions?vacancy=${id}`);
  }
}
