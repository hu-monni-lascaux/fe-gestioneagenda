import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';
import { AgendaModel } from '../models/agenda.model';
import { ServiceHourModel } from '../models/service-hour.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  #agendaUrl = "http://localhost:8080/api/v1/agenda";
  #serviceHourUrl = "http://localhost:8080/api/v1/service-hour";
  #http = inject(HttpClient);
  #auth = inject(AuthService);
  #headers: HttpHeaders = new HttpHeaders();
  #tokenJwt: string = "";

  constructor() {

  }

  // TODO: metodo da testare
  getAgendas() {
    this.updateToken();

    return this.#http.get<AgendaModel[]>(`${this.#agendaUrl}`, {
      headers: this.#headers,
    }).pipe(
      tap(res => console.log(res))
    );
  }

  setMaxAppointmentTime(minutes: number) {
    return `PT${minutes}M`;
  }

  // generare agenda -> avere id indietro -> generare i service hours
  createAgenda(dataAgenda: AgendaModel) {
    this.updateToken();
    dataAgenda.username = this.#auth.userLogged;
    return this.#http.post<AgendaModel>(`${this.#agendaUrl}`,
      dataAgenda,
      {
        headers: this.#headers,
      }
    ).pipe(
      tap(res => console.log(res))
    );
  }

  createServiceHour(serviceHour: ServiceHourModel) {
    this.updateToken();


    return this.#http.post<ServiceHourModel>(`${this.#serviceHourUrl}`,
      serviceHour,
      {
        headers: this.#headers
      }
    ).pipe(tap(res => console.log(res)));
  }

  private updateToken(): void {
    this.#tokenJwt = this.#auth.getToken() || '';
    this.#headers = new HttpHeaders({'Authorization': `Bearer ${this.#tokenJwt}`});
  }

  convertDayToEnglish(day: string): string {
    const daysMap: { [ key: string ]: string } = {
      "LUNEDI": "MONDAY",
      "MARTEDI": "TUESDAY",
      "MERCOLEDI": "WEDNESDAY",
      "GIOVEDI": "THURSDAY",
      "VENERDI": "FRIDAY",
      "SABATO": "SATURDAY",
      "DOMENICA": "SUNDAY"
    };

    const uppercasedDay = day.toUpperCase();
    return daysMap[ uppercasedDay ];
  }
}
