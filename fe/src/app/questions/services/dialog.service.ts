import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {QuestionService} from './question.service';
import {IQuestion} from '../models/question.model';
import {DialogRemoveComponent} from '../components/dialog/dialog-remove/dialog-remove.component';
import {DialogCreateEditComponent} from '../components/dialog/dialog-create-edit/dialog-create-edit.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(
    private http: HttpClient,
    public questionService: QuestionService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  public openDialog(dialogName: string, dialogEdit?: IQuestion, dialogTitleRemove?: string) {
    if (dialogName === 'edit') {
      this.questionService.canEdit(dialogEdit?._id).subscribe(bool => {
        if (bool) {
          this.dialog.open(DialogCreateEditComponent, {
            panelClass: 'my-dialog-example',
            data: {edit: dialogEdit, name: dialogName}
          });
        } else {
          const config = new MatSnackBarConfig();
          config.panelClass = ['mat-snack-bar'];
          config.duration = 2300;
          this._snackBar.open('This question is already used', 'okay', config);
        }
      });
    } else if (dialogName === 'create' || dialogName === 'view') {
      this.dialog.open(DialogCreateEditComponent, {
        panelClass: 'my-dialog-example',
        data: {edit: dialogEdit, name: dialogName}
      });
    } else if (dialogName === 'delete') {
      console.log('hello');
      this.dialog.open(DialogRemoveComponent, {
        panelClass: 'my-dialog-remove',
        data: {TitleRemove: dialogTitleRemove, data: dialogEdit}
      });
    }
  }
}
