import {ShapeDataService} from 'src/app/vacancies-info/services/shape-data.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalsService} from '../modals/modals.service';
import {ApplicationReviewRoutingModule} from './application-review-routing.module';
import {ApplicationReviewComponent} from './components/container/application-review.component';
import {MatIconModule} from '@angular/material/icon';
import {ApplicationReviewTableComponent} from './components/application-review-table/application-review-table.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [ApplicationReviewComponent, ApplicationReviewTableComponent],
  imports: [
    CommonModule,
    ApplicationReviewRoutingModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [ModalsService, ShapeDataService]
})
export class ApplicationReviewModule {}
