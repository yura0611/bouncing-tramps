import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, Observable, pluck} from 'rxjs';
import {IUpdateReviewer} from 'src/app/application/models/update-reviewer.interface';
import {IUser} from 'src/app/user/models/user.interface';

export interface State {
  user?: IUser | null;
  doneQuestionsCounter: number;
  reviewer?: IUpdateReviewer | null;
  reset?: boolean;
}

const state: State = {
  user: null,
  doneQuestionsCounter: 0
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select(name: string): Observable<any> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state
    });
  }
}
