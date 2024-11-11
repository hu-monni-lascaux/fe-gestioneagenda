import { Role } from './enums/roles';
import { AgendaModel } from './agenda.model';
import { AppointmentModel } from './appointment.model';

export interface UserModel {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
  agendas: AgendaModel[];
  appointments: AppointmentModel[]
}
