import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { io, Socket } from 'socket.io-client'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.websocketUrl);
  }

  getMensajes(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('mensaje', (response: { mensajes: any[] }) => {
        observer.next(response.mensajes);
      });
    });
  }

  getTemas(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('tema', (response: { temas: any[] }) => {
        observer.next(response.temas);
      });
    });
  }
}
