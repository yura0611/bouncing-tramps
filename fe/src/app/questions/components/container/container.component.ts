import {Component, OnDestroy, OnInit} from '@angular/core';
import {IQuestion} from '../../models/question.interface';
import {QuestionService} from '../../services/question.service';
import {Subject, switchMap, takeUntil, tap} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StoreService} from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-questions-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class QuestionsContainerComponent implements OnInit, OnDestroy {
  setEdit: boolean = false;
  topic: string[] = [];
  fname: string = '';
  type: string = '';
  random: string = '';
  selectTopic: string[] = [];
  questions: IQuestion[] = [];
  typeOptions: string[] = [];
  dialogValue: string = '';
  dialogTitleRemove: string = '';
  refreshCount: number = 0;
  sortName: string = '_id';
  sortDirection: number = 1;
  rotate = false;
  reset = false;

  private destroy$ = new Subject<void>();

  constructor(
    private questionService: QuestionService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private storeService: StoreService
  ) {}

  dialogChange(tooltip: string, isActive?: boolean, id?: any) {
    this.dialogValue = tooltip;
  }

  resetFilterSettings() {
    this.fname = '';
    this.type = '';
    this.topic = [];
    this.reset = true;
    this.storeService.set('reset', this.reset);
  }

  identifyById(index: any, item: any) {
    return item[this.sortName] * this.sortDirection;
  }

  sortMaxLength(index: any, item: any) {
    return item.maxLength;
  }

  ngOnInit(): void {
    this.questionService.buttonClickEventTrack
      .pipe(
        takeUntil(this.destroy$),
        tap(item => console.log('done')),
        switchMap(() => this.questionService.list()),
        tap(item => console.log('something', item)),
        tap(() => this.refreshCount++)
      )
      .subscribe((questions: any) => (this.questions = questions));
    this.questionService
      .list()
      .pipe(takeUntil(this.destroy$))
      .subscribe((questions: IQuestion[]) => {
        this.questions = questions;
        this.typeOptions = ['text', 'code'];
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTopicEvent(event: string[]) {
    this.topic = event;
  }

  getRandomEvent(event: string) {
    this.random = event;
  }

  sortTime() {
    this.rotate = !this.rotate;
    this.sortDirection *= -1;
    this.questionService
      .list()
      .subscribe(
        question =>
          (this.questions = question.sort(
            (a: any, b: any) => (a.maxLength - b.maxLength) * this.sortDirection
          ))
      );
  }
}
