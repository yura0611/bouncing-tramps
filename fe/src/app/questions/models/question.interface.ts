export enum IQuestionType {
  CODE = 'code',
  TEXT = 'text'
}

export interface IQuestion {
  _id: string;
  title: string;
  type: IQuestionType;
  description: string;
  maxLength?: number;
  topics: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
