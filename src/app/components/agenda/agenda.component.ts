import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridWeek',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      {title: 'event 1', date: '2024-11-12', text: "This is event 1"},
      {title: 'event 2', date: '2019-04-02'}
    ],
    locale: 'it',
    eventClick: (info) => this.handleEventClick(info),
  };

  private handleDateClick(arg: DateClickArg) {
    // TODO: dialog here
    alert('date click! ' + arg.dateStr)
  }

  private handleEventClick(info: EventClickArg){
    const event = info.event;
    console.log('Event clicked:', event.title, event.start, event.extendedProps[ 'text' ]);
  }
}
