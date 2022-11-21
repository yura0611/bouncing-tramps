import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CandidatesRoutingModule} from './candidates-routing.module';
import {CandidatesComponent} from './components/candidates/candidates.component';
import {PassingTestDialogComponent} from './components/passing-test-dialog/passing-test-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {ReactiveFormsModule} from '@angular/forms';
import {CongratsPageComponent} from './components/congrats-page/congrats-page.component';
import {SharedModule} from '../shared/shared.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TimePipe} from './pipes/time.pipe';

@NgModule({
  declarations: [CandidatesComponent, PassingTestDialogComponent, CongratsPageComponent, TimePipe],
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule,
    ReactiveFormsModule,
    SharedModule,
    MatSnackBarModule
  ],
  providers: []
})
export class CandidatesModule {}
