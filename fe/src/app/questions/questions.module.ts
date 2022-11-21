import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {QuestionsRoutingModule} from './questions-routing.module';
import {QuestionsContainerComponent} from './components/container/container.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {QuestionFilterPipe} from './pipes/question-filter.pipe';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from './components/dialog/dialog.component';
import {DialogCreateEditComponent} from './components/dialog/dialog-create-edit/dialog-create-edit.component';
import {MatChipComponent} from './components/mat-chip/topics.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DialogRemoveComponent} from './components/dialog/dialog-remove/dialog-remove.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DialogService} from './services/dialog.service';

@NgModule({
  declarations: [
    QuestionsContainerComponent,
    QuestionFilterPipe,
    DialogComponent,
    DialogCreateEditComponent,
    MatChipComponent,
    DialogRemoveComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    QuestionsRoutingModule,
    MatChipsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    DialogService
  ]
})
export class QuestionsModule {}
