import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {QuestionsContainerComponent} from './components/container/container.component';

const routes: Routes = [{path: '', component: QuestionsContainerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule {}
