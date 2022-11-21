export interface IQuestion {
  title: string;
  topics: string[];
  description: string;
  maxLength: number;
  type: string;
  isActive?: boolean;
  _id?: any;
}
