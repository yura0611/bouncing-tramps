import {IQuestion} from '../../questions/models/question.interface';

export enum IAnswerStatus {
  COMPLETED = 'Completed',
  EVALUATED = 'Evaluated',
  IN_PROGRESS = 'In progress',
  INVITED = 'Invited'
}

export interface IAnswer {
  _id: string;
  application: string;
  question: IQuestion;
  candidate: string;
  reviewer: string;
  candidateAnswer: string;
  completionTime: number;
  reviewerRank: number;
  status: IAnswerStatus;
  createdAt: string;
  updatedAt: string;
}
