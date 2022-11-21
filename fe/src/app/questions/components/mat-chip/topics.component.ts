import {Component, ElementRef, ViewChild, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IQuestion} from '../../models/question.interface';
import {QuestionService} from '../../services/question.service';
import {map, Observable, of} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {filter, startWith} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {IQuestionType} from '../../models/question.interface';
import {TopicService} from '../../../topics/services/topic.service';
import {StoreService} from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class MatChipComponent implements OnInit {
  @ViewChild('topicInput') topicInput?: ElementRef<HTMLInputElement>;
  @Output() topicEvent = new EventEmitter<string[]>();
  @Output() randomEvent = new EventEmitter<string>();
  @Output() topicsvalid = new EventEmitter<string[]>();
  @Input() EditTopics?: string[];
  @Input() validateFalse?: boolean;
  @Input() reset?: boolean;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private topicService: TopicService,
    public dialog: MatDialog,
    public storeService: StoreService
  ) {
    this.filteredTopics = this.topicCtrl.valueChanges.pipe(
      startWith(null),
      map((topic: string | null) => (topic ? this._filter(topic) : this.allTopics?.slice()))
    );
  }

  topic: string[] = [];
  fname: string = '';
  type: string = '';
  random: string = '';
  selectTopic: string[] = [];
  questions?: Observable<IQuestion[]> = of([]);
  typeOptions: Observable<IQuestionType[]> = of([]);
  typeTopics: Observable<string[]> = of([]);
  exform!: FormGroup;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  topicCtrl = new FormControl();
  filteredTopics: any;
  topics: string[] = [];
  allTopics: any = [];

  eventButton?: boolean = false;

  ngOnInit(): void {
    this.questionService.buttonClickEventTrack.subscribe(event => {
      console.log(event);
      this.eventButton === true;
      console.log('button', this.eventButton);
    });
    this.storeService.select('reset').subscribe(() => (this.topics = []));
    if (this.EditTopics) {
      this.topics = this.EditTopics;
    }
    this.topicsvalid.emit(this.topics);
    this.questions = this.questionService.list();
    this.typeOptions = this.questions.pipe(
      map(questions => [...new Set(questions.map(q => q.type))])
    );

    this.filteredTopics = this.topicService.list().pipe(map(topic => topic.map(item => item.name)));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our topic
    if (value.length >= 2 && value.length <= 10 && !this.topics.includes(event.value)) {
      this.topics.push(value);
      this.topic = this.topics;
      this.random = value;
      this.topicEvent.emit(this.topic);
      this.randomEvent.emit(this.random);
      this.topicInput!.nativeElement.value = '';

      // Clear the input value
      event.chipInput!.clear();
      this.topicCtrl.setValue(null);
    }
  }

  remove(topic: string): void {
    const index = this.topics.indexOf(topic);
    this.topic = this.topics;
    this.random = topic.toLocaleUpperCase();
    this.topicEvent.emit(this.topic);
    this.randomEvent.emit(this.random);
    if (index >= 0) {
      this.topics.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.topics.includes(event.option.viewValue)) {
      this.topics.push(event.option.viewValue);
      this.topic = this.topics;
      this.random = event.option.viewValue;
      this.topicEvent.emit(this.topic);
      this.randomEvent.emit(this.random);
      this.topicInput!.nativeElement.value = '';
      this.topicCtrl.setValue(null);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTopics.filter((topic: any) => topic.toLowerCase().includes(filterValue));
  }
}
