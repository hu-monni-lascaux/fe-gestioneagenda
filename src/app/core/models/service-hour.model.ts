import { Day } from './enums/days';

export interface ServiceHourModel {
  id?: number;
  day: string;
  start: Date | string;
  end: Date | string;
  agendaID?: number
}
