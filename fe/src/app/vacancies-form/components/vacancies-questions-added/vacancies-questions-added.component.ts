import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IQuestion} from 'src/app/questions/models/question.interface';
import {DialogService} from 'src/app/questions/services/dialog.service';

@Component({
  selector: 'app-vacancies-questions-added',
  templateUrl: './vacancies-questions-added.component.html',
  styleUrls: ['./vacancies-questions-added.component.scss']
})
export class VacanciesQuestionsAddedComponent {
  constructor(private dialogService: DialogService) {}

  @Input() items: IQuestion[] = [];

  @Input() minutes: number = 0;

  @Output() removeItemEvent = new EventEmitter();

  removeFromTask(id: string) {
    this.removeItemEvent.emit(id);
  }

  openDialog(item: any) {
    this.dialogService.openDialog('view', item);
  }
}
