import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';
import { AgendaModel } from '../models/agenda.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  #url = "http://localhost:8080/api/v1/agenda";
  #http = inject(HttpClient);
  #auth = inject(AuthService);
  readonly #tokenJwt: string;

  constructor() {
    this.#tokenJwt = this.#auth.getToken() || '';
  }

  // TODO: metodo da testare
  getAgendas() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.#tokenJwt}`
    });
    return this.#http.get<AgendaModel[]>(`${this.#url}`, {
      headers: headers,
    }).pipe(
      tap(res => console.log(res))
    );
  }
}
