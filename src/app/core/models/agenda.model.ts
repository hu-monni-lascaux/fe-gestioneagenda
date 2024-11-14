import { AppointmentModel } from './appointment.model';
import { ServiceHourModel } from './service-hour.model';

export interface AgendaModel {
  id?: number;
  name: string;
  maxAppointmentTime: string;
  username?: string;
  appointments?: AppointmentModel[];
  serviceHours?: ServiceHourModel[];
}
