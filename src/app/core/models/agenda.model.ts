import { AppointmentModel } from './appointment.model';
import { ServiceHourModel } from './service-hour.model';

export interface AgendaModel {
  id?: number;
  name: string;
  username?: string;
  maxAppointmentTime: string;
}
