import {Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IQuestion} from '../../../models/question.model';
import {Observable, of} from 'rxjs';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {QuestionService} from '../../../services/question.service';

export interface IData {
  edit: IQuestion;
  name: string;
}

@Component({
  selector: 'app-dialog-elements-example-dialog',
  templateUrl: './dialog-create-edit.component.html',
  styleUrls: ['./dialog-create-edit.component.scss']
})
export class DialogCreateEditComponent implements OnInit {
  @ViewChild('timeRes') timeRes: ElementRef;
  questions: any;
  typeOptions: string[] = [];
  topics: Observable<string[]> = of([]);
  type?: string;
  titleCreate?: string;
  decsCreate?: string;
  EditTopics?: string[];
  option?: string;
  time: number = 0;
  formCreateEdit!: FormGroup;
  edit: IQuestion = this.data.edit;
  name: string = this.data.name;
  topicsValidateForm?: string[];
  time_valid: boolean = false;
  time_greater = false;
  createOrEdit = 'create' || 'edit';
  eventButton = false;

  constructor(
    private fb: FormBuilder,
    timeRes: ElementRef,
    private questionService: QuestionService,
    public dialogRef: MatDialogRef<DialogCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IData
  ) {
    this.timeRes = timeRes;
  }

  get titleForm() {
    return this.formCreateEdit?.get('controlTitle');
  }

  get descForm() {
    return this.formCreateEdit?.get('controlDecs');
  }

  get typeForm() {
    return this.formCreateEdit?.get('controlType');
  }

  validateTopics(data: string[]) {
    this.topicsValidateForm = data;
  }

  clickForm() {
    this.questionService.buttonClickEventTrack.next(true);
    this.time_valid = true;
  }

  onSubmit() {
    this.clickForm();
    this.eventButton = true;
    this.formCreateEdit.markAllAsTouched();
    const obj: any = {
      title: this.formCreateEdit.value.controlTitle,
      description: this.formCreateEdit.value.controlDecs,
      type: this.option,
      topics: <IQuestion['topics']>this.topicsValidateForm,
      maxLength: this.time
    };

    if (
      obj &&
      this.formCreateEdit.valid &&
      this.option &&
      this.topicsValidateForm!.length > 0 &&
      this.topicsValidateForm!.length < 6 &&
      this.time
    ) {
      this.dialogRef.close();
      if (this.name == 'edit') {
        this.questionService
          .update(this.data.edit._id, obj)
          .subscribe(() => this.questionService.buttonClickEventTrack.next('something'));
      } else {
        this.questionService
          .create(obj)
          .subscribe((item: any) => this.questionService.buttonClickEventTrack.next('something'));
      }
    }
  }

  ngOnInit() {
    this.formCreateEdit = this.fb.group({
      controlTitle: [
        this.data.edit ? this.data.edit.title : '',
        [Validators.required, Validators.maxLength(250), Validators.minLength(10)]
      ],
      controlDecs: [
        this.data.edit ? this.data.edit.description : '',
        [Validators.required, Validators.maxLength(800), Validators.minLength(10)]
      ],
      controlType: [this.data.edit ? this.edit?.type : '']
    });
    if (this.data?.edit) {
      this.time = this.data.edit?.maxLength;
    } else {
      this.time = 0;
    }
    this.type = this.edit?.type;
    this.EditTopics = this.edit?.topics;
    this.questions = this.questionService.list();
    this.typeOptions = ['text', 'code'];
  }

  changeOption(event: any) {
    this.option = event;
  }

  timeChange(event: number, type: string) {
    this.time_greater = false;
    if (type == 'hour') {
      this.time += event * 60;
      if (this.time > 480) {
        this.time_greater = true;
        this.time = 0;
      }
    } else {
      if (this.time >= 480) {
        this.time_greater = true;
        this.time = 0;
      } else {
        this.time += event;
      }
    }
  }

  timeAdd() {
    this.time_greater = false;
    if (this.time >= 470) {
      this.time_greater = true;
      this.time = 0;
    } else {
      this.time += 15;
    }
  }

  timeMinus() {
    if (this.time != 0 && this.time >= 15) {
      this.time -= 15;
    } else if (this.time < 15 && this.time > 0) {
      this.time = 0;
    }
  }
}
