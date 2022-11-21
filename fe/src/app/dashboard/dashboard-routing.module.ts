import {DashboardComponent} from './components/container/dashboard.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'questions',
        loadChildren: () => import('../questions/questions.module').then(m => m.QuestionsModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'vacancies',
        loadChildren: () => import('../vacancies/vacancies.module').then(m => m.VacanciesModule)
      },
      {
        path: 'need-review',
        loadChildren: () =>
          import('../application-review/application-review.module').then(
            m => m.ApplicationReviewModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
