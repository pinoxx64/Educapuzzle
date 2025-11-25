import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chat, ChatResponse } from '../../interface/chat';
import { ChatService } from '../../service/chat.service';
import { WebsocketService } from '../../service/websocket.service';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './foro.html',
  styleUrl: './foro.css',
})

export class Foro implements OnInit, OnDestroy {
  mensajes: Chat[] = [];
  nuevaRespuesta: string = '';
  usuario: any;
  private subscriptions: any[] = [];

  constructor(
    private chatService: ChatService,
    private websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.cargarMensajesInicial();
    this.conectarWebSocket();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe?.());
  }

  cargarMensajesInicial(): void {
    const sub = this.chatService.getMensajes().subscribe({
      next: (data: any) => {
        console.log("data de getMensaje", data);
        const dataBody = data.body.chat
        let chats: Chat[] = [];
        chats = dataBody;
        this.mensajes = chats
        this.scrollAlFinal();
      },
      error: err => console.error('Error cargando chats iniciales', err)
    });
    this.subscriptions.push(sub);
  }

  conectarWebSocket(): void {
    const sub = this.websocketService.getMensajes().subscribe({
      next: (nuevosMensajes: Chat[]) => {
        console.log('Mensaje recibido por WebSocket:', nuevosMensajes);
        this.mensajes = nuevosMensajes
        this.scrollAlFinal();
      },
      error: err => console.error('Error en WebSocket', err)
    });
    this.subscriptions.push(sub);
  }

  enviarRespuesta(): void {
    const texto = (this.nuevaRespuesta || '').trim();
    if (!texto) return;

    const usuarioActual = sessionStorage.getItem('user');
    this.usuario = usuarioActual ? JSON.parse(usuarioActual) : { id: 0 };

    const payload = {
      usuId: this.usuario.user.id,
      mensaje: texto
    };

    console.log('Enviando mensaje:', payload);

    const sub = this.chatService.postMensaje(payload).subscribe({
      next: (resp: ChatResponse) => {
        console.log('Mensaje enviado:', resp);

        if (resp?.chat) {
          if (!this.mensajes.some(m => m.id === resp.chat.id)) {
            this.mensajes.push(resp.chat);
            this.scrollAlFinal();
          }
        }

        this.nuevaRespuesta = '';
      },
      error: err => {
        console.error('Error enviando mensaje', err);
      }
    });

    this.subscriptions.push(sub);
  }

  private scrollAlFinal(): void {
    try {
      const el = document.getElementById('mensajes');
      if (el) {
        setTimeout(() => {
          el.scrollTop = el.scrollHeight;
        }, 0);
      }
    } catch (e) {
      console.error('Error haciendo scroll al final', e);
    }
  }
}