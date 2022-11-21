import {ICandidate} from 'src/app/candidates/models/candidate.interface';
import {IVacancy} from 'src/app/vacancies/models/vacancy.interface';

export enum IApplicationStatus {
  COMPLETED = 'Completed',
  EVALUATED = 'Evaluated',
  IN_PROGRESS = 'In progress',
  INVITED = 'Invited'
}
export interface IReviewer {
  _id: string;
  firstName: string;
  lastName: string;
}
export interface IApplication {
  _id: string;
  vacancy: IVacancy;
  createdBy: string;
  executor: ICandidate;
  reviewer: IReviewer | string;
  status: IApplicationStatus;
  createdAt: string;
  updatedAt: string;
  score: number;
  rank: string;
}
