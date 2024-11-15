import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MyAgendasComponent } from './components/my-agendas/my-agendas.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AgendeComponent } from './components/agende/agende.component';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'errorPage',
    component: ErrorPageComponent
  },
  {
    path: 'mie-agende',
    component: MyAgendasComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'agendas/:id',
    component: AgendaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'agende',
    component: AgendeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'agendas',
    redirectTo: 'register'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
