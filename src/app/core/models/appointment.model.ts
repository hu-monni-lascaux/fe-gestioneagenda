export interface AppointmentModel {
  id?: number;
  title: string;
  text: string;
  start: Date;
  end: Date;
  username?: string;
  agendaID: number;
}
