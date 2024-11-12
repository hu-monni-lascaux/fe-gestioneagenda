export interface AppointmentModel {
  id: number;
  title: string;
  text: string;
  start: Date;
  end: Date;
  user: string;
  agendaId: number;
}
