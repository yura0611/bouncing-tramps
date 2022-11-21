import {VacanciesInfoComponent} from './components/vacancies-info/vacancies-info.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VacanciesInfoContainerComponent} from './components/container/container.component';

const routes: Routes = [
  {
    path: '',
    component: VacanciesInfoContainerComponent,
    children: [
      {
        path: '',
        component: VacanciesInfoComponent
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('../vacancies-form/vacancies-form.module').then(m => m.VacanciesFormModule)
      },
      {
        path: ':applicationId',
        loadChildren: () =>
          import('../application-info/application-info.module').then(m => m.ApplicationInfoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacanciesInfoRoutingModule {}
