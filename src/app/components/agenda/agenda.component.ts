import {AfterContentChecked, AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventClickArg} from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import {Calendar} from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {MatDialog} from '@angular/material/dialog';
import {
  CreateAppointmentDialogComponent
} from '../../dialogs/create-appointment-dialog/create-appointment-dialog.component';
import moment from 'moment';
import {AgendaService} from '../../core/services/agenda.service';
import {ActivatedRoute} from '@angular/router';
import {forkJoin, map, Observable, of, Subscription, switchMap} from 'rxjs';
import {BusinessHoursModel} from '../../core/models/business-hours.model';
import {ServiceHourModel} from '../../core/models/service-hour.model';
import {AppointmentModel} from '../../core/models/appointment.model';
import {AuthService} from "../../core/services/auth.service";

interface Data {
  agendaId: number,
  serviceHours: ServiceHourModel[];
  appointments: AppointmentModel[];
  maxAppointmentTime: string
}

// interface AppointmentForkObject {
//
// }

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {
  #agendaService = inject(AgendaService);
  #authService = inject(AuthService);
  #router = inject(ActivatedRoute);
  #subscription = new Subscription();

  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  #dialog = inject(MatDialog);

  #agendaId: number = 0;
  #maxAppointmentTime: number = 0;
  #appointments: AppointmentModel[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    // initialView: 'dayGridWeek',

    plugins: [interactionPlugin, timeGridPlugin],
    locale: 'it',
    eventTimeFormat: { // Formatta l'orario di inizio e fine dell'evento
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    displayEventEnd: true,
    // dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (info) => this.handleEventClick(info),

    //new options
    selectable: true,
    select: (arg) => this.handleDateClick(arg),
    selectConstraint: 'businessHours',

    expandRows: false,
    slotDuration: '00:05:00',
    slotMinTime: '09:00',
    slotMaxTime: '18:00',

  };

  private handleDateClick(arg: DateSelectArg) {
    // hardcoded default, fix here
    const startDate = moment(arg.start).format('YYYY-MM-DDTHH:mm');
    const endDate = moment(startDate).add(this.#maxAppointmentTime, 'minutes').format('YYYY-MM-DDTHH:mm');

    const events = this.calendarComponent?.getApi().getEvents() || [];

    const dialogRef = this.#dialog.open(CreateAppointmentDialogComponent, {
      data: {start: startDate, end: endDate, existingEvents: events},
    });

    dialogRef.afterClosed()
        .subscribe(result => {
          if (result) {
            const appointment = {
              title: result.title,
              start: result.start,
              end: result.end,
              extendedProps: {
                text: result.text
              }
            }
            this.calendarComponent?.getApi().addEvent(appointment);

            // TODO: salvare appointments sul db
            this.#agendaService.createAppointment({
              title: appointment.title,
              start: appointment.start,
              end: appointment.end,
              agendaID: this.#agendaId,
              text: appointment.extendedProps.text,
              username: this.#authService.userLogged,
            }).subscribe(result => console.log(result));

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
    console.log("sono stato qui di nuovo")
    this.#subscription.add(
        this.#router.params.pipe(
            switchMap(params => {
              const id = params['id'];
              return this.#agendaService.getExistingAgenda(id).pipe(
                  switchMap(agenda =>
                      forkJoin({
                        agendaId: of(agenda.id),
                        maxAppointmentTime: of(agenda.maxAppointmentTime),
                        serviceHours: this.#agendaService.getServiceHoursByAgenda(agenda.id!),
                        appointments: this.#agendaService.getAppointmentsByAgenda(agenda.id!),
                      }).pipe(
                          map(({agendaId, serviceHours, appointments, maxAppointmentTime}) => ({
                            agendaId,
                            serviceHours,
                            appointments,
                            maxAppointmentTime
                          }) as Data)
                      )
                  )
              );
            })
        ).subscribe({
          next: ({agendaId, serviceHours, appointments, maxAppointmentTime}: Data) => {
            let businessHours: BusinessHoursModel[] = [];
            serviceHours.forEach(sh => {
              businessHours.push({
                daysOfWeek: [this.convertDay(sh.day)],
                startTime: sh.start as string,
                endTime: sh.end as string,
              });
            });

            this.#agendaId = agendaId;
            this.calendarOptions.businessHours = businessHours;
            this.#maxAppointmentTime = Number(maxAppointmentTime.match(/\d+/));
            localStorage.setItem(this.#agendaService.maxAppointmentTimeKey, this.#maxAppointmentTime.toString());

            this.#appointments = [...appointments];
            console.log("ON INIT: " + this.#appointments)

            console.log(this.#appointments)
            this.#appointments.forEach(appointment => {
              console.log("Eccomi" + appointment.title);
              this.calendarComponent?.getApi().addEvent({
                title: appointment.title,
                end: "2024-11-18T11:57",
                startStr: new Date(appointment.start),
                endStr: new Date(appointment.end),
                start: "2024-11-18T11:56",
                extendedProps: {
                  text: appointment.text
                }
              })

            });

            console.log(this.calendarComponent?.getApi().getEvents());
            this.calendarComponent?.getApi().render();
          },
          error: (err) => {
            console.error('Error occurred:', err);
          }
        })
    );
  }

  ngAfterViewInit() {
    // console.log("On after view init" + this.#appointments);

  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }

  ngAfterContentChecked(): void {

  }
}
