import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fe-gestioneagenda';

  // #auth = inject(AuthService);
  //
  // ngOnInit() {
  //   const user = this.#auth.getUserData();
  //   console.log(user);
  // }
}
