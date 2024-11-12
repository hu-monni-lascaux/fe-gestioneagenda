import { Component } from '@angular/core';

@Component({
  selector: 'app-my-agendas',
  templateUrl: './my-agendas.component.html',
  styleUrl: './my-agendas.component.css'
})
export class MyAgendasComponent {

  agendas = []

  onClick(){
    throw new Error('Method not implemented.');
  }

  createAgenda() {
    throw new Error('Method not implemented.');
  }
}
