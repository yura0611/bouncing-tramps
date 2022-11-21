import {AnswerService} from '../../../answers/services/answer.service';
import {Component, OnInit, Inject, OnChanges} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IAnswer} from 'src/app/answers/models/answer.interface';
import {IApplicationStatus} from '../../../application/models/application.interface';

@Component({
  selector: 'app-question-view-modal',
  templateUrl: './question-view-modal.component.html',
  styleUrls: ['./question-view-modal.component.scss']
})
export class QuestionViewModalComponent implements OnInit, OnChanges {
  marks = [...Array(11).keys()];
  rating!: number;
  hoverState = -1;
  currentAnswer!: IAnswer;
  status: boolean = false;
  answerInd!: number;

  constructor(
    private answerService: AnswerService,
    public dialogRef: MatDialogRef<QuestionViewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public evalWindow: any
  ) {}

  ngOnInit(): void {
    this.answerInd = +this.evalWindow.title.split` `[1][0] - 1;
    this.currentAnswer = this.evalWindow.modalData[this.answerInd];
    if (this.currentAnswer.reviewerRank) {
      this.rating = this.currentAnswer.reviewerRank;
    } else {
      this.rating = -1;
    }
  }

  ngOnChanges() {
    this.dialogRef.close(this.evalWindow);
  }

  starEnter(mark: number) {
    this.hoverState = mark;
  }

  starLeav() {
    this.hoverState = -1;
  }

  starClicked(num: number) {
    this.rating = num;
    this.evalWindow.modalData[this.answerInd].status = IApplicationStatus.EVALUATED;
    this.answerService
      .evaluate(this.currentAnswer._id, {reviewerRank: num})
      .subscribe(
        answer => (this.evalWindow.modalData[this.answerInd].reviewerRank = answer.reviewerRank)
      );
  }

  nextAnswer(i: number) {
    if (this.answerInd + i < 0 || this.answerInd + i >= this.evalWindow.modalData.length) {
      return;
    }

    this.answerInd += i;
    this.evalWindow.title = this.evalWindow.title.replace(
      this.evalWindow.title.charAt(9),
      `${this.answerInd + 1}`
    );
    this.currentAnswer = this.evalWindow.modalData[this.answerInd];
    if (this.currentAnswer.reviewerRank) {
      this.rating = this.currentAnswer.reviewerRank;
    } else {
      this.rating = -1;
    }
  }
}
