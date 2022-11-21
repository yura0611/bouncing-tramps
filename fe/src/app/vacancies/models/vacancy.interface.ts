export enum IVacancyType {
  WEB = 'Web',
  MANAGMENT = 'Management',
  IOS = 'IOS',
  ANDROID = 'Android'
}

export interface IVacancy {
  _id?: string;
  title: string;
  type: IVacancyType;
  link?: string;
  description: string;
  isActive: boolean;
  questions: string[];
  createdAt?: string;
  updatedAt?: string;
}
