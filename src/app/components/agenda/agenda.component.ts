import { Component, inject, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import {
  CreateAppointmentDialogComponent
} from '../../dialogs/create-appointment-dialog/create-appointment-dialog.component';
import moment from 'moment';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  #dialog = inject(MatDialog);

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridWeek',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [
      // {title: 'event 1', date: '2024-11-12', text: "This is event 1"},
    ],
    locale: 'it',
    eventTimeFormat: { // Formatta l'orario di inizio e fine dell'evento
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    displayEventEnd: true,
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (info) => this.handleEventClick(info),
  };

  private handleDateClick(arg: DateClickArg) {
    // hardcoded default, fix here
    const startDate = moment(arg.dateStr).set({ hour: 12, minute: 0 }).format('YYYY-MM-DDTHH:mm');
    const endDate = moment(startDate).add(15, "minutes").format('YYYY-MM-DDTHH:mm');

    const events = this.calendarComponent?.getApi().getEvents() || [];

    const dialogRef = this.#dialog.open(CreateAppointmentDialogComponent, {
      data: {start: startDate, end: endDate, existingEvents: events},
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        this.calendarOptions.events = [
          ...this.calendarOptions.events as EventInput[],
          {
            title: result.title,
            start: result.start,
            end: result.end,
            extendedProps: {
              text: result.text
            }
          }
        ];
      });
  }

  private handleEventClick(info: EventClickArg) {
    const event = info.event;
    console.log('Event clicked:', event.title, event.start, event.extendedProps[ 'text' ]);
  }
}
