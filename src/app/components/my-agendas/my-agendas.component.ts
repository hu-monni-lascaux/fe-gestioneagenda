import { Component, inject, OnInit } from '@angular/core';
import { AgendaService } from '../../core/services/agenda.service';

@Component({
  selector: 'app-my-agendas',
  templateUrl: './my-agendas.component.html',
  styleUrl: './my-agendas.component.css'
})
export class MyAgendasComponent implements OnInit {
  #agendaService = inject(AgendaService);
  agendas = []

  onClick(){
    throw new Error('Method not implemented.');
  }



  createAgenda() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(){

  }
}
