import { Component, inject, OnInit } from '@angular/core';
import { AgendaService } from '../../core/services/agenda.service';
import { AgendaModel } from '../../core/models/agenda.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-agendas',
  templateUrl: './my-agendas.component.html',
  styleUrl: './my-agendas.component.css'
})
export class MyAgendasComponent implements OnInit {
  #agendaService = inject(AgendaService);
  #router = inject(Router);

  // TODO: inizializzazione di prova da eliminare
  agendas: AgendaModel[] = [{
    id: 1,
    user: 'pippo',
    name: 'pippos_agenda',
    appointments: [],
    maxAppointmentTime: new Date('11:50'),
    serviceHours: []
  }]

  onClick(id: number) {
    this.#router.navigate([`agendas/${id}`]);
  }


  createAgenda() {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.#agendaService.getAgendas().subscribe(res => this.agendas = res);
  }
}
