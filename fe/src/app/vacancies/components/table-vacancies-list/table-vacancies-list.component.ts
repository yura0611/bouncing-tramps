import {IVacancy} from '../../models/vacancy.interface';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {TableVacanciesListDataSource} from './table-vacancies-list-datasource';
import {VacancyService} from 'src/app/vacancies/services/vacancy.service';

@Component({
  selector: 'app-table-vacancies-list',
  templateUrl: './table-vacancies-list.component.html',
  styleUrls: ['./table-vacancies-list.component.scss']
})
export class TableVacanciesListComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IVacancy>;
  dataSource: TableVacanciesListDataSource;

  displayedColumns = ['title', 'type', 'isActive', 'createdAt'];

  constructor(private vacancyService: VacancyService) {
    this.dataSource = new TableVacanciesListDataSource();
  }

  ngAfterViewInit(): void {
    this.vacancyService.list().subscribe(items => {
      this.dataSource.data = items;
      this.dataSource.sort = this.sort;
      this.table.dataSource = this.dataSource;
    });
  }
}
