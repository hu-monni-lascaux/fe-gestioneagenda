import { Component, inject, OnInit } from '@angular/core';
import { AgendaService } from '../../core/services/agenda.service';
import { AgendaModel } from '../../core/models/agenda.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agende',
  templateUrl: './agende.component.html',
  styleUrl: './agende.component.css'
})
export class AgendeComponent implements OnInit{

  #agendaService = inject(AgendaService)
  #router = inject(Router);

  public allAgende$: Observable<AgendaModel[]> = this.#agendaService.getAgendas();


  ngOnInit(): void {

  }

  onClick(id: number) {
    this.#router.navigate([`agendas/${id}`]);
  }
}
