import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MyAgendasComponent } from './components/my-agendas/my-agendas.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AgendeComponent } from './components/agende/agende.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'errorPage', component: ErrorPageComponent},
  {path: 'mie-agende', component: MyAgendasComponent},
  {path: 'agendas/:id', component: AgendaComponent},
  {path: 'agende', component: AgendeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
