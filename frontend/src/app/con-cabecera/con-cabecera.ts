import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { CabeceraComponent } from '../shared/cabecera/cabecera';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-con-cabecera',
  imports: [
    ToastModule,
    CabeceraComponent,
    RouterOutlet
  ],
  providers: [
    MessageService
  ],
  templateUrl: './con-cabecera.html',
  styleUrl: './con-cabecera.css'
})
export class conCabeceraComponent {

  constructor(
    //private websocketService: WebsocketService, esto es del websocket
    private messageService: MessageService
  ) { }

  ngOnInit() {

  }
}
