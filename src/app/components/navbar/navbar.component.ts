import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  protected readonly localStorage = localStorage;

  #authService = inject(AuthService)

  logout() {
    this.#authService.doLogout();
  }
}
