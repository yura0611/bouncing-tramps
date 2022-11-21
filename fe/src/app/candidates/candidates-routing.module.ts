import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CandidatesComponent} from './components/candidates/candidates.component';
import {SorryPageComponent} from './components/sorry-page/sorry-page.component';
import {CongratsPageComponent} from './components/congrats-page/congrats-page.component';

const routes: Routes = [
  {
    path: '',
    component: CandidatesComponent
  },
  {
    path: 'congrats-page',
    component: CongratsPageComponent
  },
  {
    path: 'sorry-page',
    component: SorryPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatesRoutingModule {}
