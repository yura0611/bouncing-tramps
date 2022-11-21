import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IApplication} from '../models/application.interface';
import {IUpdateReviewer} from '../models/update-reviewer.interface';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(private http: HttpClient) {}

  getOne(id: string): Observable<IApplication> {
    return this.http.get<IApplication>(`${environment.API_ENDPOINT}/applications/${id}`);
  }

  getCompleted(): Observable<IApplication[]> {
    return this.http.get<IApplication[]>(
      `${environment.API_ENDPOINT}/applications/assigned?status=completed`
    );
  }

  inviteCandidate(data: IApplication): Observable<IApplication> {
    return this.http.post<IApplication>(`${environment.API_ENDPOINT}/applications`, data);
  }

  getAllApplicationsByVacancyId(vacancyId: string): Observable<IApplication[]> {
    return this.http.get<IApplication[]>(
      `${environment.API_ENDPOINT}/applications/?vacancy=${vacancyId}`
    );
  }

  submitEvaluation(id: IApplication['_id'], body: Partial<IApplication>): Observable<IApplication> {
    return this.http.patch<IApplication>(`${environment.API_ENDPOINT}/applications/${id}`, body);
  }

  updateReviewer(body: IUpdateReviewer): Observable<any> {
    return this.http.patch(`${environment.API_ENDPOINT}/applications`, body);
  }

  deleteApplications(body: any): Observable<any> {
    return this.http.delete(`${environment.API_ENDPOINT}/applications`, {body});
  }
}
