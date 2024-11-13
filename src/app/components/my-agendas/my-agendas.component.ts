import { Component, inject, OnInit } from '@angular/core';
import { AgendaService } from '../../core/services/agenda.service';
import { AgendaModel } from '../../core/models/agenda.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TimeSlotDialogComponent } from '../../dialogs/time-slot-dialog/time-slot-dialog.component';
import { ServiceHourModel } from '../../core/models/service-hour.model';
import { Day } from '../../core/models/enums/days';


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
    maxAppointmentTime: "PT15M",
    serviceHours: []
  }]

  onClick(id: number) {
    this.#router.navigate([`agendas/${id}`]);
  }

  createAgenda() {
    const dialogRef = this.#createAgendaDialog.open(TimeSlotDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const maxAppointmentTime = this.#agendaService.setMaxAppointmentTime(result['maxAppointmentTime']);
        let id: number = -1;
        this.#agendaService.createAgenda({
          maxAppointmentTime,
          name: result['name'],
        }).subscribe(res => id = res.id!);

        // creare service hours
        // in result abbiamo ancora i giorni della settimana come campi
        for (const key in result) {
          if(Array.isArray(result[key]) && result[key].length > 0) {
            result[key].forEach((value) => {
              const serviceHour: ServiceHourModel = {
                day: Day[key.toUpperCase() as keyof typeof Day],

              }
            })
          }

        }
      }
    });
  }

  // private get

  ngOnInit() {
    this.#agendaService.getAgendas().subscribe(res => this.agendas = res);
  }

  protected readonly onclick = onclick;
}
