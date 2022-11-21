import {IUser} from '../../../user/models/user.interface';
import {UserService} from '../../../user/services/user.service';
import {AnswerService} from '../../../answers/services/answer.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionViewModalComponent} from '../question-view-modal/question-view-modal.component';
import {ModalsService} from 'src/app/modals/modals.service';
import {ApplicationService} from 'src/app/application/services/application.service';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {IApplication} from 'src/app/application/models/application.interface';
import {IAnswer} from 'src/app/answers/models/answer.interface';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.scss']
})
export class ApplicationInfoComponent implements OnInit, OnDestroy {
  displayedColumns = ['question', 'status', 'mark'];
  dataSource!: IAnswer[];
  public applicationId!: string;
  public applicationInfo!: IApplication;
  private sub: any;
  popUp!: boolean;
  public reviewerMode = false;
  private user!: IUser;

  constructor(
    public dialogService: ModalsService,
    private applicationService: ApplicationService,
    private answerService: AnswerService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.applicationId = params['applicationId'];
    });
    forkJoin([
      this.applicationService.getOne(this.applicationId),
      this.userService.getUser(),
      this.answerService.candidateAnswers(this.applicationId)
    ]).subscribe(
      res => {
        this.applicationInfo = res[0];
        this.user = res[1];
        this.dataSource = res[2];
        this.applicationInfo.score = this.scoreCount();

        if (this.applicationInfo.reviewer === this.user._id) {
          this.reviewerMode = true;
        }
      },
      error => {
        if (error) {
          this.router.navigate([`not-found`]).then();
        }
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  scoreCount(): number {
    let sum = this.dataSource
      .filter(elem => elem.status === 'Evaluated')
      .map(elem => elem.reviewerRank)
      .reduce((sum, mark) => sum + mark, 0);

    return sum / this.dataSource.filter(elem => elem.status === 'Evaluated').length / 10;
  }

  openEvaluation(elIndex: any) {
    const options = {
      width: '756px'
    };
    const componentData = {
      title: `Question ${elIndex + 1}/${this.dataSource.length}`,
      component: QuestionViewModalComponent,
      modalType: 'questionViewModal',
      modalData: this.dataSource
    };
    this.dialogService.open(options, componentData);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.dataSource = confirmed.modalData;
        return;
      }
      this.applicationInfo.score = this.scoreCount();
    });
  }

  submitApplication() {
    let evalueted = this.dataSource.filter(elem => elem.status === 'Evaluated');
    if (evalueted.length === this.dataSource.length) {
      this.applicationService
        .submitEvaluation(this.applicationId, {score: Math.round(this.applicationInfo.score * 100)})
        .subscribe(submit => {
          this.applicationService.getOne(this.applicationId).subscribe(res => {
            this.applicationInfo = res;
            this.applicationInfo.score = this.scoreCount();
          });
        });
    } else {
      this.popUp = true;
      setTimeout(() => (this.popUp = false), 1500);
    }
  }

  isNumber(val: any): boolean {
    return typeof val === 'number' && val === val;
  }
}
