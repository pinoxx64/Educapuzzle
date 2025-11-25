import { Injectable } from '@angular/core';
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

  
}
