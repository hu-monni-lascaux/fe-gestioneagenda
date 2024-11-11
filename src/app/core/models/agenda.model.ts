import { UserModel } from './user.model';
import { AppointmentModel } from './appointment.model';
import { ServiceHourModel } from './service-hour.model';

export interface AgendaModel {
  id: number;
  name: string;
  maxAppointmentTime: Date;
  user: UserModel;
  appointments: AppointmentModel[];
  serviceHours: ServiceHourModel[];
}
