import {Pipe, PipeTransform} from '@angular/core';
import {IQuestion} from '../models/question.model';

@Pipe({name: 'filterQuestions'})
export class QuestionFilterPipe implements PipeTransform {
  transform(
    value: any,
    fname: string = '',
    type: string = '',
    topics: any = [],
    random: string = '',
    refreshCount: number
  ): IQuestion[] {
    let castedValue = value as IQuestion[];
    let result!: any;
    if (castedValue) {
      result = castedValue?.filter(castedValue => {
        return (
          castedValue.isActive &&
          castedValue.title!.toLowerCase().indexOf(fname.toLowerCase()) > -1 &&
          castedValue.type!.toLowerCase().indexOf(type.toLowerCase()) > -1 &&
          topics!.every((item: any) => castedValue.topics.includes(item))
        );
      });
    }

    return result;
  }
}
