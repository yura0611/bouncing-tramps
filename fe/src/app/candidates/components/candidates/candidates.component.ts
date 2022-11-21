import {Component, OnInit} from '@angular/core';
import {PassingTestDialogComponent} from '../passing-test-dialog/passing-test-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {StoreService} from '../../../shared/services/store.service';
import {IQuestion} from '../../../questions/models/question.interface';
import {CandidateService} from '../../services/candidate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription, take, map} from 'rxjs';
import {IHiddenQuestion} from '../../models/hidden-question.interface';
import {IExternalVacancy} from '../../models/external-vacancy.interface';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  public doneQuestionsCounter = 0;
  public vacancy: IExternalVacancy = {
    vacancy: {
      title: '',
      description: '',
      type: ''
    },
    status: ''
  };
  public displayedColumns: string[] = ['question', 'status', 'mark'];

  dataSource: IHiddenQuestion[] = [];
  currentQuestion!: {info: IQuestion; index: number};
  questionIterator!: any;

  answersStatistics: any = {
    countQuestions: this.dataSource.length,
    timeLeft: ''
  };

  private subscription!: Subscription;
  token: any;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private storeService: StoreService,
    private candidateService: CandidateService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.storeService.select('doneQuestionsCounter').subscribe(item => {
      this.doneQuestionsCounter = <number>item;
    });
  }

  ngOnInit(): void {
    this.subscription = this.activateRoute.params.subscribe((params: any) => {
      this.token = params['token'];
    });
    sessionStorage.setItem('jwt_token', this.token);
    this.candidateService.getAllExternalVacancyInfo().subscribe((vacancy: IExternalVacancy) => {
      this.vacancy = vacancy;
    });
    this.candidateService
      .getAllExternalQuestions()
      .pipe(
        take(1),
        map((questions: IHiddenQuestion[]) => {
          const openedIndex = questions.findIndex((question: IHiddenQuestion) => !question.title);

          if (openedIndex !== -1) {
            questions.forEach((question, index) => {
              if (index < openedIndex) {
                question.questionStatus = 'done';
              } else {
                question.questionStatus = 'closed';
              }
            });
            questions[openedIndex].questionStatus = 'opened';
          } else {
            questions.forEach(question => (question.questionStatus = 'done'));
          }

          return questions;
        })
      )
      .subscribe(
        (questions: IHiddenQuestion[]) => {
          this.dataSource = questions;

          this.answersStatistics.countQuestions = questions.length;

          this.answersStatistics.timeLeft = this.dataSource
            .map(item => item.maxLength)
            .reduce((sum, item) => sum + item, 0);

          const doneQuestionsNumber = questions.filter(
            (question: IHiddenQuestion) => question.questionStatus === 'done'
          ).length;
          this.storeService.set('doneQuestionsCounter', doneQuestionsNumber);
          this.storeService.set('questionsCount', questions.length);

          this.questionIterator = this.questionGenerator();

          const firstQuestionInfo = this.questionIterator.next().value;
          if (firstQuestionInfo) {
            const {_id, index} = firstQuestionInfo;

            this.candidateService
              .getExternalQuestion(_id)
              .pipe(take(1))
              .subscribe(question => {
                this.currentQuestion = {
                  info: question,
                  index
                };
              });
          }
        },
        error => {
          if (error) {
            this.router.navigate([`candidates/${this.token}/sorry-page`]);
          }
        }
      );

    if (!localStorage.getItem(this.token)) {
      localStorage.setItem(this.token, String(Date.now()));
    }
  }

  isNumber(val: any): boolean {
    return !isNaN(val);
  }

  openDialog() {
    const dialogRef = this.dialog.open(PassingTestDialogComponent, {
      width: '756px',
      data: {
        questionIterator: this.questionIterator,
        currentQuestion: this.currentQuestion
      }
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(question => {
        this.currentQuestion = question;
      });
  }

  *questionGenerator() {
    for (let i = this.doneQuestionsCounter; i < this.dataSource.length; i++) {
      if (i > 0) {
        this.dataSource[i - 1].questionStatus = 'done';
        this.dataSource[i].questionStatus = 'opened';
      }
      this.dataSource[i].title = yield {
        _id: this.dataSource[i]._id,
        index: i
      };
    }

    if (this.currentQuestion) {
      const questionsNumber = this.dataSource.length;

      const lastQuestion = this.dataSource[questionsNumber - 1];
      lastQuestion.questionStatus = 'done';
      lastQuestion.title = this.currentQuestion.info.title;

      this._snackBar.open('Test is completed!', '', {
        duration: 2000,
        panelClass: 'success-pop-up'
      });

      this.storeService.set('doneQuestionsCounter', questionsNumber);
    }
  }

  answersSubmit() {
    let notQuestionsIndex = this.dataSource.findIndex(question => question.title === null);
    if (notQuestionsIndex === -1) {
      this.candidateService.changeAnsweredApplicationStatus().subscribe();
      this.router.navigate([`candidates/${this.token}/congrats-page`]).then();
    }
  }
}
