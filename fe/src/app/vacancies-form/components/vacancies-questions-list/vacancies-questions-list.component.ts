import {QuestionService} from 'src/app/questions/services/question.service';
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {IQuestion, IQuestionType} from 'src/app/questions/models/question.interface';
import {AutoFocusDirective} from '../../services/auto-focus.directive';
import {DialogService} from 'src/app/questions/services/dialog.service';

@Component({
  selector: 'app-vacancies-questions-list',
  templateUrl: './vacancies-questions-list.component.html',
  styleUrls: ['./vacancies-questions-list.component.scss'],
  providers: [AutoFocusDirective]
})
export class VacanciesQuestionsListComponent implements OnInit {
  @ViewChild('searchbar')
  public searchText: string = '';
  @Output() addItemEvent = new EventEmitter();
  @Input() selectedItems: string[] = [];
  @Input() totalTime: number = 0;
  query: string = '';
  questions: Observable<IQuestion[]> = of([]);
  typeOptions: Observable<IQuestionType[]> = of([]);
  displayedColumns = ['body', 'time'];
  toggleSearch: boolean = false;

  constructor(private questionService: QuestionService, private dialogService: DialogService) {}

  openSearch() {
    this.toggleSearch = true;
  }

  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }

  addToTask(item: IQuestion): void {
    if (this.totalTime <= 50) {
      this.addItemEvent.emit(item);
    }
  }

  ngOnInit(): void {
    this.questions = this.questionService.list();
    this.typeOptions = this.questions.pipe(map(items => [...new Set(items.map(q => q.type))]));
  }

  openDialog(item: any) {
    this.dialogService.openDialog('view', item);
  }

  createQuestion() {
    this.dialogService.openDialog('create');
  }
}
