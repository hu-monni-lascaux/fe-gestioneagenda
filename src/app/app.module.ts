import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyAgendasComponent } from './components/my-agendas/my-agendas.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AgendaComponent } from './components/agenda/agenda.component';
import { CreateAppointmentDialogComponent } from './dialogs/create-appointment-dialog/create-appointment-dialog.component';
import { TimeSlotDialogComponent } from './dialogs/time-slot-dialog/time-slot-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ErrorPageComponent,
    HomepageComponent,
    NavbarComponent,
    MyAgendasComponent,
    AgendaComponent,
    CreateAppointmentDialogComponent,
    TimeSlotDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FullCalendarModule,
    FormsModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
