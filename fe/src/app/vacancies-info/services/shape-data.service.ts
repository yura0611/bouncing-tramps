import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ShapeDataService {
  private data = new BehaviorSubject('');
  sharedData = this.data.asObservable();

  private mark = new BehaviorSubject('');
  sharedMark = this.mark.asObservable();

  nextData(data: any) {
    this.data.next(data);
  }

  nextMark(mark: any) {
    this.mark.next(mark);
  }
}
