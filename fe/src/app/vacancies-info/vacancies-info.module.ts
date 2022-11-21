import {VacanciesInfoComponent} from './components/vacancies-info/vacancies-info.component';
import {MatSortModule} from '@angular/material/sort';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VacanciesInfoRoutingModule} from './vacancies-info-routing.module';
import {RemoveApplicationsModalComponent} from './components/remove-applications-modal/remove-applications-modal.component';
import {ModalsService} from '../modals/modals.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ModalsComponent} from '../modals/modals.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {ShapeDataService} from './services/shape-data.service';
import {InviteCandidateComponent} from './components/invite-candidate/invite-candidate.component';
import {VacanciesInfoContainerComponent} from './components/container/container.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {VacancyStatusComponent} from './components/vacancy-status/vacancy-status.component';
import {ChangeReviewerComponent} from './components/change-reviewer/change-reviewer.component';
import {PopUpComponent} from './components/pop-up/pop-up.component';

@NgModule({
  declarations: [
    VacanciesInfoContainerComponent,
    RemoveApplicationsModalComponent,
    InviteCandidateComponent,
    VacanciesInfoComponent,
    VacancyStatusComponent,
    ChangeReviewerComponent,
    PopUpComponent
  ],
  entryComponents: [ModalsComponent],
  imports: [
    CommonModule,
    VacanciesInfoRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatAutocompleteModule
  ],
  providers: [ModalsService, ShapeDataService]
})
export class VacanciesInfoModule {}
