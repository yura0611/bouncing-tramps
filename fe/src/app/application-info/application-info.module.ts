import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApplicationInfoRoutingModule} from './application-info-routing.module';
import {ApplicationInfoComponent} from './components/container/application-info.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {QuestionViewModalComponent} from './components/question-view-modal/question-view-modal.component';
import {ModalsService} from 'src/app/modals/modals.service';
import {PopUpComponent} from './components/pop-up/pop-up.component';

@NgModule({
  declarations: [ApplicationInfoComponent, QuestionViewModalComponent, PopUpComponent],
  imports: [
    CommonModule,
    ApplicationInfoRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    SharedModule
  ],
  providers: [ModalsService]
})
export class ApplicationInfoModule {}
