import {DataSource} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {IApplication} from 'src/app/application/models/application.interface';

export class TableNeedReviewListDataSource extends DataSource<IApplication> {
  data: IApplication[] = [];
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  connect(): Observable<IApplication[]> {
    if (this.sort) {
      return merge(observableOf(this.data), this.sort.sortChange).pipe(
        map(() => {
          return this.getSortedData([...this.data]);
        })
      );
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {}

  private getSortedData(data: IApplication[]): IApplication[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'type':
          return compare(
            a.vacancy.type.toLocaleLowerCase(),
            b.vacancy.type.toLocaleLowerCase(),
            isAsc
          );
        case 'vacancy':
          return compare(a.vacancy.title, b.vacancy.title, isAsc);
        case 'candidate':
          return compare(
            a.executor.firstName.toLocaleLowerCase(),
            b.executor.firstName.toLocaleLowerCase(),
            isAsc
          );
        case 'opened':
          return compare(a.updatedAt, b.updatedAt, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
