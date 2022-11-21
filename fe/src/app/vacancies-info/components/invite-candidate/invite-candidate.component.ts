import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil
} from 'rxjs';
import {ModalsService} from 'src/app/modals/modals.service';
import {CandidateService} from 'src/app/candidates/services/candidate.service';
import {ShapeDataService} from '../../services/shape-data.service';
import {MatDialogRef} from '@angular/material/dialog';
import {ModalsComponent} from 'src/app/modals/modals.component';
import {ApplicationService} from 'src/app/application/services/application.service';
import {ICandidate} from 'src/app/candidates/models/candidate.interface';

@Component({
  selector: 'app-invite-candidate',
  templateUrl: './invite-candidate.component.html',
  styleUrls: ['./invite-candidate.component.scss'],
  interpolation: ['{{', '}}']
})
export class InviteCandidateComponent implements OnInit, AfterViewInit {
  @ViewChild('search') searchInput!: ElementRef;
  isCandidate: boolean = false;
  invitedCandidate: boolean = false;
  newCandidate: boolean = true;
  inviteCandidateForm: any = FormGroup;
  public candidates!: ICandidate[];
  public candidate!: ICandidate;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    public sharedService: ShapeDataService,
    public dialogService: ModalsService,
    public fb: FormBuilder,
    private candidateService: CandidateService,
    private applicationService: ApplicationService,
    private mdDialogRef: MatDialogRef<ModalsComponent>
  ) {}

  ngOnInit() {
    this.inviteCandidateForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      vacancy: new FormControl(this.mdDialogRef.componentInstance.data.id)
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(
          (): Observable<ICandidate[]> =>
            !!this.searchInput.nativeElement.value.trim()
              ? this.candidateService.searchByEmail(this.searchInput.nativeElement.value)
              : of([])
        )
      )
      .subscribe((response: ICandidate[]) => {
        this.candidates = response;
      });
  }

  public chooseCandidate($event: any): void {
    this.candidate = $event.option.value;
    this.inviteCandidateForm.controls['email'].setValue($event.option.value.email);
    this.inviteCandidateForm.controls['firstName'].setValue($event.option.value.firstName);
    this.inviteCandidateForm.controls['lastName'].setValue($event.option.value.lastName);
  }

  public displayFn(user: ICandidate | string): string {
    if (typeof user !== 'object') {
      return user;
    }
    return user ? user.email : '';
  }

  public onSubmit(): void {
    this.inviteCandidateForm.markAllAsTouched();
    if (this.inviteCandidateForm.valid) {
      this.applicationService.inviteCandidate(this.inviteCandidateForm.value).subscribe(
        res => {
          this.invitedCandidate = true;
          this.inviteCandidateForm.reset();
          setTimeout(() => {
            this.invitedCandidate = false;
            this.mdDialogRef.close(true);
          }, 1500);
        },
        err => {
          if (err.status == '403') {
            this.isCandidate = true;
            setTimeout(() => {
              this.isCandidate = false;
            }, 1500);
          } else {
            this.inviteCandidateForm.reset();
            this.mdDialogRef.close(true);
          }
        },
        () => {
          console.log('HTTP request completed.');
        }
      );
    }
  }
}
