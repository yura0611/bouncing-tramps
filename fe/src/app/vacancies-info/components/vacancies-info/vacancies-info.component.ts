import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ModalsService} from '../../../modals/modals.service';
import {RemoveApplicationsModalComponent} from '../remove-applications-modal/remove-applications-modal.component';
import {ShapeDataService} from '../../services/shape-data.service';
import {InviteCandidateComponent} from '../invite-candidate/invite-candidate.component';
import {VacancyStatusComponent} from '../vacancy-status/vacancy-status.component';
import {VacancyService} from 'src/app/vacancies/services/vacancy.service';
import {ChangeReviewerComponent} from '../change-reviewer/change-reviewer.component';
import {
  catchError,
  filter,
  finalize,
  switchMap,
  take,
  Subscription,
  Subject,
  takeUntil
} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from 'src/app/application/services/application.service';
import {StoreService} from 'src/app/shared/services/store.service';
import {IVacancy} from 'src/app/vacancies/models/vacancy.interface';
import {IApplication, IApplicationStatus} from 'src/app/application/models/application.interface';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-vacancies-info',
  templateUrl: './vacancies-info.component.html',
  styleUrls: ['./vacancies-info.component.scss']
})
export class VacanciesInfoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['select', 'candidate', 'status', 'score', 'reviewer', 'invited'];
  dataSource!: MatTableDataSource<IApplication>;
  selection = new SelectionModel<IApplication>(true, []);
  data: any;
  id!: string;
  private subscription!: Subscription;
  checkedCount: number = 0;
  vacancyResponse!: IVacancy;
  completed: number = 0;
  countApp: number = 0;
  private updateApplicationsList$: Subject<boolean> = new Subject();
  private destroy$: Subject<void> = new Subject();
  public isPopupShowed: boolean = false;
  public popupStatus: boolean = false;
  public currentMessage: string = '';

  constructor(
    public dialogService: ModalsService,
    public sharedService: ShapeDataService,
    private vacancyService: VacancyService,
    private applicationService: ApplicationService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute,
    private clipboard: Clipboard
  ) {
    this.subscription = this.activatedRoute.params.subscribe((params: any) => {
      this.id = params['vacancyId'];
    });
  }

  ngOnInit(): void {
    this.getVacancyInfo();
    this.getApplicationList();

    this.updateApplicationsList$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        switchMap(() => this.applicationService.getAllApplicationsByVacancyId(this.id))
      )
      .subscribe((applications: IApplication[]) => {
        if (applications?.length) {
          this.dataSource = new MatTableDataSource<IApplication>(applications);
          this.countApp = applications.length;
          applications.forEach((application: IApplication) => {
            if (
              application.status === IApplicationStatus.EVALUATED ||
              application.status === IApplicationStatus.COMPLETED
            ) {
              this.completed += 1;
            }
          });
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortData = (data: IApplication[], sort: MatSort): any => {
      return data.sort((a: any, b: any): any => {
        const isAsc = this.sort?.direction === 'asc';
        switch (this.sort?.active) {
          case 'candidate':
            return this.compare(a.executor.firstName, b.executor.firstName, isAsc);

          case 'status':
            return this.compare(a.status, b.status, isAsc);

          case 'score':
            return this.compare(a.score, b.score, isAsc);

          case 'reviewer':
            return this.compare(a.reviewer.firstName, b.reviewer.firstName, isAsc);

          case 'invited':
            return this.compare(String(a.createdAt), String(b.createdAt), isAsc);

          default:
            return 0;
        }
      });
    };
  }

  inviteUserToApplication() {
    const options = {
      width: '496px'
    };
    const componentData = {
      title: 'Invite Candidate',
      confirmText: 'Invite',
      component: InviteCandidateComponent,
      modalType: 'questionsModal',
      id: this.id
    };
    this.dialogService.open(options, componentData);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.getApplicationList();
      }
    });
  }

  changeReviewer(id?: string): void {
    const applications = id ? [id] : this.selection.selected.map(item => item._id);
    const options = {
      width: '496px'
    };
    const componentData = {
      title: 'Change Reviewer',
      component: ChangeReviewerComponent,
      applications
    };
    this.dialogService.open(options, componentData);
    this.dialogService
      .confirmed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.store.select('reviewer')),
        switchMap(reviewer => this.applicationService.updateReviewer(reviewer)),
        take(1),
        catchError(err => {
          this.isPopupShowed = true;
          this.popupStatus = false;
          this.currentMessage = 'Changed reviewer failed!';

          setTimeout(() => {
            this.isPopupShowed = false;
            this.currentMessage = '';
          }, 1500);

          throw err;
        }),
        finalize(() => this.store.set('reviewer', null))
      )
      .subscribe(() => {
        this.isPopupShowed = true;
        this.popupStatus = true;
        this.currentMessage = 'Successfully changed reviewer!';

        this.updateApplicationsList$.next(true);

        setTimeout(() => {
          this.isPopupShowed = false;
          this.currentMessage = '';
        }, 1500);
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.filter(
      row => row.status !== 'Completed' && row.status !== 'Evaluated'
    ).length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data
          .filter(row => row.status !== 'Completed' && row.status !== 'Evaluated')
          .forEach(row => this.selection.select(row));

    this.checkedCount = this.selection.selected.length;
  }

  onChangeChecked(row: any): void {
    this.selection.toggle(row);
    this.checkedCount = this.selection.selected.length;
  }

  removeApplications(id?: string) {
    const body = {
      applications: ['']
    };
    body.applications = id ? [id] : this.selection.selected.map(item => item._id);
    const options = {
      width: '496px'
    };
    const componentData = {
      title: 'Remove all candidates',
      confirmText: 'Remove all',
      cancelText: 'Cancel',
      component: RemoveApplicationsModalComponent,
      modalType: 'confirmModal'
    };

    this.dialogService.open(options, componentData);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.applicationService.deleteApplications(body).subscribe(item => {
          this.getApplicationList();
          this.selection.clear();
          this.checkedCount = 0;
        });
      }
    });
  }

  getVacancyInfo() {
    this.vacancyService.one(this.id).subscribe(data => {
      this.vacancyResponse = data;
    });
  }

  getApplicationList() {
    this.countApp = 0;
    this.completed = 0;
    this.applicationService.getAllApplicationsByVacancyId(this.id).subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource<IApplication>(data);
        this.countApp = data.length;
        data.forEach(app => {
          if (app.status === 'Evaluated' || app.status === 'Completed') {
            this.completed += 1;
          }
        });
      }
      console.log('data:', data);
      console.log('completed: ', this.completed);
      console.log('length: ', this.countApp);
    });
  }

  closeVacancy() {
    const options = {
      width: '496px'
    };
    const componentData = {
      title: 'Close Vacancy',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      component: VacancyStatusComponent,
      modalType: 'confirmModal'
    };
    this.dialogService.open(options, componentData);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.updateVacancy(this.id, false).subscribe(() => (this.vacancyResponse.isActive = false));
      }
    });
  }

  openVacancy() {
    this.updateVacancy(this.id, true).subscribe(() => (this.vacancyResponse.isActive = true));
  }

  updateVacancy(id: string, status: boolean) {
    return this.vacancyService.update(id, {isActive: status});
  }

  copyVacancyLinkToClipboard() {
    this.clipboard.copy(window.location.href);
  }

  compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
