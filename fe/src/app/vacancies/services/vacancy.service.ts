import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IVacancy} from '../models/vacancy.interface';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  constructor(private http: HttpClient) {}

  update(id: IVacancy['_id'], vacancy: Partial<IVacancy>): Observable<IVacancy> {
    return this.http.patch<IVacancy>(`${environment.API_ENDPOINT}/vacancies/${id}`, vacancy);
  }

  list(): Observable<IVacancy[]> {
    return this.http.get<IVacancy[]>(`${environment.API_ENDPOINT}/vacancies`);
  }

  create(vacancy: IVacancy): Observable<IVacancy> {
    return this.http.post<IVacancy>(`${environment.API_ENDPOINT}/vacancies`, vacancy);
  }

  one(id: IVacancy['_id']): Observable<IVacancy> {
    return this.http.get<IVacancy>(`${environment.API_ENDPOINT}/vacancies/${id}`);
  }
}
