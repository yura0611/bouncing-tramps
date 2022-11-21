import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {IQuestion} from '../../models/question.model';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() dialogName!: string;
  @Input() dialogTitleRemove!: string;
  @Input() dialogEdit!: IQuestion;

  constructor(public dialog: MatDialog, public dialogService: DialogService) {}

  openDialog() {
    this.dialogService.openDialog(this.dialogName, this.dialogEdit, this.dialogTitleRemove);
  }
}
