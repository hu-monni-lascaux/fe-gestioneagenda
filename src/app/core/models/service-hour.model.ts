import { Day } from './enums/days';

export interface ServiceHourModel {
  id?: number;
  day: string;
  start: Date;
  end: Date;
  agenda?: number
}
