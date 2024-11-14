import { Day } from './enums/days';

export interface ServiceHourModel {
  id?: number;
  day: string;
  start: string;
  end: string;
  agendaID?: number
}
