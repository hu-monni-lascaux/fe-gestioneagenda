import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import {
  CreateAppointmentDialogComponent
} from '../../dialogs/create-appointment-dialog/create-appointment-dialog.component';
import moment from 'moment';
import { AgendaService } from '../../core/services/agenda.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, Subscription, switchMap } from 'rxjs';
import { BusinessHoursModel } from '../../core/models/business-hours.model';
import { ServiceHourModel } from '../../core/models/service-hour.model';
import { AppointmentModel } from '../../core/models/appointment.model';

interface Data {
  serviceHours: ServiceHourModel[];
  appointments: AppointmentModel[];
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent implements OnInit {
  #agendaService = inject(AgendaService);
  #router = inject(ActivatedRoute);
  #param: any;
  #subscription = new Subscription();

  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  #dialog = inject(MatDialog);

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    // initialView: 'dayGridWeek',

    plugins: [interactionPlugin, timeGridPlugin],
    events: [],
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
    const startDate = moment(arg.dateStr).set({hour: 12, minute: 0}).format('YYYY-MM-DDTHH:mm');
    const endDate = moment(startDate).add(15, "minutes").format('YYYY-MM-DDTHH:mm');

    const events = this.calendarComponent?.getApi().getEvents() || [];

    const dialogRef = this.#dialog.open(CreateAppointmentDialogComponent, {
      data: {start: startDate, end: endDate, existingEvents: events},
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.calendarComponent?.getApi().addEvent({
            title: result.title,
            start: result.start,
            end: result.end,
            extendedProps: {
              text: result.text
            }
          });

          // TODO: salvare appointments sul db
        }
      });
  }

  private handleEventClick(info: EventClickArg) {
    const event = info.event;
    console.log('Event clicked:', event.title, event.start, event.extendedProps['text']);
    // TODO: do something here
  }

  private convertDay(day: string) {
    const dayMap: { [key: string]: number } = {
      'sunday': 0,
      'monday': 1,
      'tuesday': 2,
      'wednesday': 3,
      'thursday': 4,
      'friday': 5,
      'saturday': 6
    };
    const dayLowerCase = day.toLowerCase();
    return dayMap[dayLowerCase];
  }

  ngOnInit() {
    this.#subscription.add(
      this.#router.params.pipe(
        switchMap(params => {
          const id = params['id'];
          return this.#agendaService.getExistingAgenda(id).pipe(
            switchMap(agenda =>
              forkJoin({
                serviceHours: this.#agendaService.getServiceHoursByAgenda(agenda.id!),
                appointments: this.#agendaService.getAppointmentsByAgenda(agenda.id!),
              }).pipe(
                map(({serviceHours, appointments}) => ({
                  serviceHours,
                  appointments
                }) as Data)
              )
            )
          );
        })
      ).subscribe({
        next: ({serviceHours, appointments}: Data) => {
          let businessHours: BusinessHoursModel[] = [];

          serviceHours.forEach(sh => {
            businessHours.push({
              daysOfWeek: [this.convertDay(sh.day)],
              startTime: sh.start as string,
              endTime: sh.end as string,
            });
          });

          this.calendarOptions.businessHours = businessHours;

          appointments.forEach(appointment =>
            this.calendarComponent?.getApi().addEvent({
              title: appointment.title,
              start: appointment.start,
              end: appointment.end,
              extendedProps: {
                text: appointment.text
              }
            }))
        },
        error: (err) => {
          console.error('Error occurred:', err);
        }
      })
    );
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}
