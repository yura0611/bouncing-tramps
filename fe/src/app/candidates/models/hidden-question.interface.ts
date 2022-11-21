import {IQuestionType} from '../../questions/models/question.interface';

export interface IHiddenQuestion {
  _id: string;
  type: IQuestionType;
  maxLength: number;
  title?: string;
  questionStatus?: string;
}
