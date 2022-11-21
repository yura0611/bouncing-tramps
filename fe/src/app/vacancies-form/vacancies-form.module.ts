import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VacanciesFormRoutingModule} from './vacancies-form-routing.module';
import {VacanciesFormComponent} from './components/container/vacancies-form.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {VacanciesQuestionsAddedComponent} from './components/vacancies-questions-added/vacancies-questions-added.component';
import {MatChipsModule} from '@angular/material/chips';
import {SearchFilterPipe} from './services/question-filter.pipe';
import {AutoFocusDirective} from './services/auto-focus.directive';
import {VacanciesQuestionsListComponent} from './components/vacancies-questions-list/vacancies-questions-list.component';
import {VacanciesEditComponent} from './components/vacancies-edit/vacancies-edit.component';

@NgModule({
  declarations: [
    VacanciesQuestionsListComponent,
    VacanciesFormComponent,
    VacanciesQuestionsAddedComponent,
    SearchFilterPipe,
    AutoFocusDirective,
    VacanciesEditComponent
  ],
  imports: [
    CommonModule,
    VacanciesFormRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    FormsModule
  ]
})
export class VacanciesFormModule {}
