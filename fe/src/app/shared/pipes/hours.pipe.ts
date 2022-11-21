import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hours'
})
export class HoursPipe implements PipeTransform {
  transform(wholeTimeMinutes: number): string {
    const mins = wholeTimeMinutes % 60;
    const hours = (wholeTimeMinutes - mins) / 60;

    return `${hours} h ${mins} min`;
  }
}
