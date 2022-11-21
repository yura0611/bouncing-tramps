import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appDatoAutoFocus]'
})
export class AutoFocusDirective {
  @Input()
  public set appDatoAutoFocus(value: any) {
    if (!!value) {
      this.host.nativeElement.focus();
    }
  }

  public constructor(private host: ElementRef) {}
}
