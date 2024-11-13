import { AppointmentModel } from './appointment.model';
import { ServiceHourModel } from './service-hour.model';

export interface AgendaModel {
  id?: number;
  name: string;
  maxAppointmentTime: string;
  user?: string;
  appointments?: AppointmentModel[];
  serviceHours?: ServiceHourModel[];
}
