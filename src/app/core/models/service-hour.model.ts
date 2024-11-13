import { Day } from './enums/days';

export interface ServiceHourModel {
  id?: number;
  day: Day;
  start: Date;
  end: Date;
  agenda?: number
}
