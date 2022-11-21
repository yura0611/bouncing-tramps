import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subject, take, takeUntil} from 'rxjs';
import {CandidatesComponent} from '../candidates/candidates.component';
import {StoreService} from '../../../shared/services/store.service';
import {IQuestion} from '../../../questions/models/question.interface';
import {CandidateService} from '../../services/candidate.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-passing-test-dialog',
  templateUrl: './passing-test-dialog.component.html',
  styleUrls: ['./passing-test-dialog.component.scss']
})
export class PassingTestDialogComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  public currentQuestion!: {
    info: IQuestion;
    index: number;
  };

  private questionsCount$ = this.store.select('questionsCount');
  public questionsCount!: number;

  public doneQuestionsCounter!: number;

  passingTestForm = new FormGroup({
    answer: new FormControl('', [Validators.minLength(10), Validators.maxLength(1000)])
  });

  constructor(
    private _snackBar: MatSnackBar,
    private candidateService: CandidateService,
    public dialogRef: MatDialogRef<CandidatesComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      questionIterator: any;
      currentQuestion: {
        info: IQuestion;
        index: number;
      };
    },
    private store: StoreService
  ) {}

  ngOnInit() {
    this.store
      .select('doneQuestionsCounter')
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.doneQuestionsCounter = <number>res;
      });

    this.questionsCount$.pipe(take(1)).subscribe(count => {
      this.questionsCount = <number>count;
    });

    this.currentQuestion = this.data.currentQuestion;

    this.dialogRef
      .backdropClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.onClose();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit() {
    const token = sessionStorage.getItem('jwt_token')!;

    const lastQuestionStartDate = +localStorage.getItem(token)!;

    const answerData = {
      question: this.currentQuestion.info._id,
      candidateAnswer: this.passingTestForm.value.answer,
      completionTime: this._completionTime(lastQuestionStartDate)
    };
    this.candidateService
      .sendAnswer(answerData)
      .pipe(take(1))
      .subscribe(
        () => {
          if (this.currentQuestion.index + 1 === this.questionsCount) {
            this.data.questionIterator.next();
            this.dialogRef.close(this.currentQuestion);
            return;
          }

          this._nextQuestion();

          this.passingTestForm.reset();
        },
        err => {
          if (err.status == '403') {
            this._snackBar.open('Test is already opened. Close this page!', '', {
              duration: 2000,
              panelClass: 'error-pop-up'
            });
          }
        }
      );
  }

  _nextQuestion() {
    const token = sessionStorage.getItem('jwt_token')!;
    localStorage.setItem(token, String(Date.now()));

    const nextQuestionInfo = this.data.questionIterator.next(this.currentQuestion.info.title);

    const {_id, index} = nextQuestionInfo.value;
    this.currentQuestion.index = index;
    this.candidateService
      .getExternalQuestion(_id)
      .pipe(take(1))
      .subscribe(question => {
        this.currentQuestion.info = question;
      });

    if (this.doneQuestionsCounter !== this.questionsCount) {
      this.store.set('doneQuestionsCounter', this.doneQuestionsCounter + 1);
    }
  }

  onClose() {
    this.dialogRef.close(this.currentQuestion);
  }

  _completionTime = (startDate: number) => Math.floor((Date.now() - startDate) / 1000 / 60) + 1;
}
