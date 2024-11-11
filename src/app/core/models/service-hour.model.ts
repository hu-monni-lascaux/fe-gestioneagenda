import { AgendaModel } from './agenda.model';
import { Day } from './enums/days';

export interface ServiceHourModel {
  id: number;
  day: Day;
  start: Date;
  end: Date;
  agenda: AgendaModel
}
