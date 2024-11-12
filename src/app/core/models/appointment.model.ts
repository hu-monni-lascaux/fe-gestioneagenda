import { UserModel } from './user.model';
import { AgendaModel } from './agenda.model';

export interface AppointmentModel {
  id: number;
  title: string;
  text: string;
  start: Date;
  end: Date;
  user: string;
  agenda: AgendaModel;
}
