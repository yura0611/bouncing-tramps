import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApplicationInfoComponent} from './components/container/application-info.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationInfoRoutingModule {}
