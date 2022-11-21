import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {QuestionService} from 'src/app/questions/services/question.service';
import {IQuestion} from '../../../models/question.model';

export interface DialogData {
  TitleRemove: string;
  data: IQuestion;
}

@Component({
  selector: 'app-dialog-remove',
  templateUrl: './dialog-remove.component.html',
  styleUrls: ['./dialog-remove.component.scss']
})
export class DialogRemoveComponent implements OnInit {
  constructor(
    private questionService: QuestionService,
    public dialogRef: MatDialogRef<DialogRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  TitleRemove: string = this.data.TitleRemove;

  ngOnInit(): void {}

  deleteQuestion() {
    this.questionService
      .update(this.data.data._id, {isActive: false})
      .subscribe(item => this.questionService.buttonClickEventTrack.next(event));
  }
}
