import {Component, Input} from '@angular/core';
import {IQuestion} from 'src/app/questions/models/question.interface';
import {DialogService} from 'src/app/questions/services/dialog.service';

@Component({
  selector: 'app-vacancies-edit',
  templateUrl: './vacancies-edit.component.html',
  styleUrls: ['./vacancies-edit.component.scss']
})
export class VacanciesEditComponent {
  constructor(private dialogService: DialogService) {}

  @Input() itemsEdit: IQuestion[] = [];

  @Input() minutes: number = 0;

  openDialog(item: any) {
    this.dialogService.openDialog('view', item);
  }
}
