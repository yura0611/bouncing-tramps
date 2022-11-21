import {VacanciesListComponent} from './components/vacancies-list/vacancies-list.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VacanciesContainerComponent} from './components/container/vacancies.component';

const routes: Routes = [
  {
    path: '',
    component: VacanciesContainerComponent,
    children: [
      {
        path: '',
        component: VacanciesListComponent
      },
      {
        path: 'add',
        loadChildren: () =>
          import('../vacancies-form/vacancies-form.module').then(m => m.VacanciesFormModule)
      },
      {
        path: 'need-review',
        loadChildren: () =>
          import('../application-review/application-review.module').then(
            m => m.ApplicationReviewModule
          )
      },
      {
        path: 'edit/:vacancyId',
        loadChildren: () =>
          import('../vacancies-form/vacancies-form.module').then(m => m.VacanciesFormModule)
      },
      {
        path: ':vacancyId',
        loadChildren: () =>
          import('../vacancies-info/vacancies-info.module').then(m => m.VacanciesInfoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacanciesRoutingModule {}
