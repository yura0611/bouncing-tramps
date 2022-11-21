import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ICandidate} from '../models/candidate.interface';
import {IHiddenQuestion} from '../models/hidden-question.interface';
import {IQuestion} from '../../questions/models/question.interface';
import {IAnswer} from '../models/answer.interface';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  constructor(private http: HttpClient) {}

  searchByEmail(email: ICandidate['email']): Observable<ICandidate[]> {
    return this.http.get<ICandidate[]>(`${environment.API_ENDPOINT}/candidates?email=${email}`);
  }

  create(candidate: ICandidate): Observable<ICandidate> {
    return this.http.post<ICandidate>(`${environment.API_ENDPOINT}/candidates`, candidate);
  }

  getAllExternalVacancyInfo(): Observable<any> {
    return this.http.get<any>(`${environment.API_ENDPOINT}/applications/external`);
  }

  getAllExternalQuestions(): Observable<IHiddenQuestion[]> {
    return this.http.get<IHiddenQuestion[]>(`${environment.API_ENDPOINT}/questions/external`);
  }

  getExternalQuestion(id: string): Observable<IQuestion> {
    return this.http.get<IQuestion>(`${environment.API_ENDPOINT}/questions/${id}/external`);
  }

  sendAnswer(answer: IAnswer): Observable<any> {
    return this.http.post<any>(`${environment.API_ENDPOINT}/answers/external`, answer);
  }

  changeAnsweredApplicationStatus(body?: any | null): Observable<any> {
    return this.http.patch<any>(`${environment.API_ENDPOINT}/applications/external/submit`, body);
  }
}
