import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ModalsService} from './modals.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {
  @ViewChild('target', {read: ViewContainerRef, static: true}) vcRef: ViewContainerRef | any;
  componentRef: ComponentRef<any> | any;

  validation: boolean | any;

  constructor(
    public resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      confirmText: string;
      cancelText?: string;
      component: any;
      modalType: string;
      modalData?: [];
      id?: string;
    },
    private mdDialogRef: MatDialogRef<ModalsComponent>,
    public dialogService: ModalsService
  ) {
    this.dialogService.sharedValStatus.subscribe(val => (this.validation = val));
  }

  ngOnInit(): void {
    let factory = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.vcRef.createComponent(factory);

    this.dialogService.sharedValStatus.subscribe(val => (this.validation = val));
  }

  public close(value: any) {
    this.mdDialogRef.close(value);
  }

  public cancel(): void {
    this.close(false);
  }

  public save(): void {
    if (this.validation) {
      this.close(true);
    } else {
      this.dialogService.changeIfFieldsValidatedStatus(false);
    }
  }

  public confirm(): void {
    this.close(true);
  }

  public onClose(): void {
    this.mdDialogRef.close(false);
  }
}
