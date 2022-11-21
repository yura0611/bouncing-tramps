import {ApplicationReviewComponent} from './components/container/application-review.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ApplicationReviewComponent
  },
  {
    path: ':applicationId',
    loadChildren: () =>
      import('../application-info/application-info.module').then(m => m.ApplicationInfoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationReviewRoutingModule {}
