import { Component, inject, OnInit } from '@angular/core';
import { AgendaService } from '../../core/services/agenda.service';
import { AgendaModel } from '../../core/models/agenda.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TimeSlotDialogComponent } from '../../dialogs/time-slot-dialog/time-slot-dialog.component';
import { ServiceHourModel } from '../../core/models/service-hour.model';
import { Day } from '../../core/models/enums/days';
import moment from 'moment';


@Component({
  selector: 'app-my-agendas',
  templateUrl: './my-agendas.component.html',
  styleUrl: './my-agendas.component.css'
})
export class MyAgendasComponent implements OnInit {
  #agendaService = inject(AgendaService);
  #router = inject(Router);
  #createAgendaDialog = inject(MatDialog);

  agendas: AgendaModel[] = [];

  onClick(id: number) {
    this.#router.navigate([`agendas/${id}`]);
  }

  createAgenda() {
    const dialogRef = this.#createAgendaDialog.open(TimeSlotDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const maxAppointmentTime = this.#agendaService.setMaxAppointmentTime(result[ 'maxAppointmentTime' ]);
        let id: number = -1;
        this.#agendaService.createAgenda({
          maxAppointmentTime,
          name: result[ 'name' ],
        }).subscribe({
          next: (res: any) => {
            if (res.id) {
              id = res.id!;
              this.createServiceHour(result, id);
            }
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }

  // creare service hours
  // in result abbiamo ancora i giorni della settimana come campi
  // @ts-ignore
  private createServiceHour(result, id: number) {
    for (const key in result) {
      if (Array.isArray(result[ key ]) && result[ key ].length > 0) {
        result[ key ].forEach((value) => {
          let [start, end] = value.split('-');
          // start = moment(start, 'HH:mm').toDate();
          // end = moment(end, 'HH:mm').toDate();
          const serviceHour: ServiceHourModel = {
            // day: Day[ key.toUpperCase() as keyof typeof Day ],
            day: this.#agendaService.convertDayToEnglish(key),
            start: start,
            end: end,
            agendaID: id,
          }

          this.#agendaService.createServiceHour(serviceHour)
            .subscribe(res => {
              this.#router.navigate([`agendas/${id}`]);
            })
        });
      }
    }
  }

  ngOnInit() {
    this.#agendaService.getAgendas().subscribe(res => this.agendas = res);
  }

  protected readonly onclick = onclick;
}
