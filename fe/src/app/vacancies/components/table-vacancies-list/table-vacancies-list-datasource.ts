import {IVacancy} from '../../models/vacancy.interface';
import {DataSource} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';

export class TableVacanciesListDataSource extends DataSource<IVacancy> {
  data: IVacancy[] = [];
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  connect(): Observable<IVacancy[]> {
    if (this.sort) {
      return merge(observableOf(this.data), this.sort.sortChange).pipe(
        map(() => {
          return this.getSortedData([...this.data]);
        })
      );
    } else {
      throw Error();
    }
  }

  disconnect(): void {}

  private getSortedData(data: IVacancy[]): IVacancy[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a: IVacancy, b: IVacancy) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);

        case 'type':
          return compare(a.type, b.type, isAsc);

        case 'isActive':
          return compare(String(a.isActive), String(b.isActive), isAsc);

        case 'createdAt':
          return compare(String(a.createdAt), String(b.createdAt), isAsc);

        default:
          return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
