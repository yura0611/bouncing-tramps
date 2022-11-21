import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ModalsComponent} from './modals.component';
import {Observable, take, map, BehaviorSubject} from 'rxjs';

@Injectable()
export class ModalsService {
  private isValidated = new BehaviorSubject(false);
  sharedValStatus = this.isValidated.asObservable();

  private isAllFieldsValidated = new BehaviorSubject(true);
  sharedFieldsValStatus = this.isAllFieldsValidated.asObservable();

  constructor(private dialog: MatDialog) {}

  dialogRef: MatDialogRef<ModalsComponent> | any;

  public open(options: any, componentData: any): void {
    this.dialogRef = this.dialog.open(ModalsComponent, {
      width: options.width,

      data: {
        width: componentData.width,
        title: componentData.title,
        component: componentData.component,
        confirmText: componentData.confirmText,
        cancelText: componentData.cancelText,
        modalType: componentData.modalType,
        modalData: componentData.modalData,
        id: componentData.id,
        ...componentData
      }
    });
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map(res => {
        return res;
      })
    );
  }

  public changeStatus(status: boolean) {
    this.isValidated.next(status);
  }

  public changeIfFieldsValidatedStatus(status: boolean) {
    this.isAllFieldsValidated.next(status);
  }
}
