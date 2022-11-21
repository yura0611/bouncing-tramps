import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs';
import {ModalsService} from 'src/app/modals/modals.service';
import {IUser} from 'src/app/user/models/user.interface';
import {UserService} from 'src/app/user/services/user.service';
import {StoreService} from 'src/app/shared/services/store.service';
import {MatDialogRef} from '@angular/material/dialog';
import {ModalsComponent} from 'src/app/modals/modals.component';

@Component({
  selector: 'tc-change-reviewer',
  templateUrl: './change-reviewer.component.html',
  styleUrls: ['./change-reviewer.component.scss']
})
export class ChangeReviewerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('search') searchInput!: ElementRef;

  public changeReviewerForm!: FormGroup;
  public reviewers!: IUser[];
  public reviewer!: IUser;
  public applications: String[] = [];
  private isChoosed: boolean = false;
  public isPopupShowed: boolean = false;
  public popupStatus: boolean = false;
  public currentMessage: string = '';
  public isValid$: Subject<boolean> = new Subject<boolean>();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private usersService: UserService,
    private dialogService: ModalsService,
    private fb: FormBuilder,
    private store: StoreService,
    private mdDialogRef: MatDialogRef<ModalsComponent>
  ) {}

  ngOnInit(): void {
    this.changeReviewerForm = this.fb.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'submit'
      })
    });

    this.applications = this.dialogService.dialogRef.componentInstance.data.applications;

    this.isValid$.pipe(takeUntil(this.destroy$)).subscribe(valid => {
      if (!valid) {
        this.isPopupShowed = true;

        if (!this.changeReviewerForm.valid) {
          this.currentMessage = 'Field email is required and must be valid email';
        } else {
          this.currentMessage = 'No user with such email';
        }

        setTimeout(() => {
          this.isPopupShowed = false;
          this.currentMessage = '';
        }, 1500);
      }
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(
          (): Observable<IUser[]> =>
            !!this.searchInput.nativeElement.value.trim()
              ? this.usersService.searchUserByEmail(this.searchInput.nativeElement.value)
              : of([])
        ),
        tap(() => {
          if (this.reviewer) {
            if (this.reviewer?.email !== this.searchInput.nativeElement.value.trim()) {
              this.isChoosed = false;
            }

            if (!this.isChoosed && this.reviewer) {
              this.store.set('reviewer', null);
            }
          }
        })
      )
      .subscribe((response: IUser[]) => (this.reviewers = response));
  }

  public displayFn(user: IUser | string): string {
    if (typeof user !== 'object') {
      return user;
    }
    return user ? user.email : '';
  }

  public onBlur(): void {
    if (
      this.reviewers?.length === 1 &&
      this.reviewers[0].email === this.searchInput.nativeElement.value.trim()
    ) {
      this.reviewer = this.reviewers[0];
      this.isChoosed = true;
      this.store.set('reviewer', {applications: this.applications, reviewer: this.reviewer._id});
    }
  }

  public onFocus(): void {
    if (this.changeReviewerForm.controls['email'].dirty) {
      this.changeReviewerForm.controls['email'].markAsPristine();
    }
  }

  public chooseReviewer($event: any): void {
    this.reviewer = $event.option.value;

    this.store.set('reviewer', {applications: this.applications, reviewer: this.reviewer._id});

    this.isChoosed = true;

    this.changeReviewerForm.controls['email'].setValue($event.option.value.email);
  }

  public submit(): void {
    if (this.changeReviewerForm.valid && this.isChoosed) {
      this.isValid$.next(true);
      this.mdDialogRef.close(true);
    } else {
      this.isValid$.next(false);
      this.changeReviewerForm.controls['email'].markAsDirty();
    }
  }

  ngOnDestroy(): void {
    this.dialogService
      .confirmed()
      .pipe(take(1))
      .subscribe(status => (status ? null : this.store.set('reviewer', null)));

    this.destroy$.next();
    this.destroy$.complete();
  }
}
