import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VacanciesRoutingModule} from './vacancies-routing.module';
import {VacanciesListComponent} from './components/vacancies-list/vacancies-list.component';
import {TableVacanciesListComponent} from './components/table-vacancies-list/table-vacancies-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {VacanciesContainerComponent} from './components/container/vacancies.component';
import {MatDialogModule} from '@angular/material/dialog';
import {QuestionsModule} from '../questions/questions.module';

@NgModule({
  declarations: [VacanciesContainerComponent, VacanciesListComponent, TableVacanciesListComponent],
  imports: [
    CommonModule,
    MatIconModule,
    VacanciesRoutingModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    QuestionsModule
  ]
})
export class VacanciesModule {}
