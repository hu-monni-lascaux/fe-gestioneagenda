import { Component, inject, OnInit } from '@angular/core';
import { AgendaService } from '../../core/services/agenda.service';
import { AgendaModel } from '../../core/models/agenda.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TimeSlotDialogComponent } from '../../dialogs/time-slot-dialog/time-slot-dialog.component';


@Component({
  selector: 'app-my-agendas',
  templateUrl: './my-agendas.component.html',
  styleUrl: './my-agendas.component.css'
})
export class MyAgendasComponent implements OnInit {
  #agendaService = inject(AgendaService);
  #router = inject(Router);
  #createAgendaDialog = inject(MatDialog);

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
    const dialogRef = this.#createAgendaDialog.open(TimeSlotDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

  ngOnInit() {
    this.#agendaService.getAgendas().subscribe(res => this.agendas = res);
  }

  protected readonly onclick = onclick;
}
