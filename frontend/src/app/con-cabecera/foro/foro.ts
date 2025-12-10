import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chat, ChatResponse } from '../../interface/chat';
import { ChatService } from '../../service/chat.service';
import { WebsocketService } from '../../service/websocket.service';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    DialogModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './foro.html',
  styleUrl: './foro.css',
})
export class Foro implements OnInit, OnDestroy {

  mensajes: Chat[] = [];
  nuevaRespuesta: string = '';
  usuario: any;
  isAdmin: boolean = false;

  visible: boolean = false;
  nombre: string = "";

  temas: any[] = [];
  temaSeleccionado: number | null = null;

  private subscriptions: any[] = [];

  constructor(
    private chatService: ChatService,
    private websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      const usuario = JSON.parse(user);
      this.isAdmin = usuario.user.roles.includes('Administrador');
    }

    this.cargarTemas();
    this.conectarWebSocket();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe?.());
  }


  cargarTemas(): void {
    const sub = this.chatService.getNombreTemas().subscribe({
      next: (data: any) => {
        console.log(data)
        this.temas = data.body.temas || [];
      },
      error: err => console.error("Error cargando temas", err)
    });
    this.subscriptions.push(sub);
  }

  cargarMensajesDeTema(): void {
    if (!this.temaSeleccionado) {
      this.mensajes = [];
      return;
    }

    const sub = this.chatService.getMensajesPorTemas(this.temaSeleccionado).subscribe({
      next: (data: any) => {
        this.mensajes = data.body.chat || [];
        this.scrollAlFinal();
      },
      error: err => console.error("Error cargando mensajes por tema", err)
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

    const tem = this.websocketService.getTemas().subscribe({
      next: (nuevosTemas: any[]) => {
        console.log('Tema recibido por WebSocket:', nuevosTemas);
        this.temas = nuevosTemas;
      },
      error: err => console.error('Error en WebSocket', err)
    });
    this.subscriptions.push(tem);
    this.subscriptions.push(sub);
  }

  enviarRespuesta(): void {
    const texto = (this.nuevaRespuesta || '').trim();
    if (!texto || !this.temaSeleccionado) return;

    const usuarioActual = sessionStorage.getItem('user');
    this.usuario = usuarioActual ? JSON.parse(usuarioActual) : { id: 0 };

    const temaNum = Number(this.temaSeleccionado);

    const payload = {
      usuId: this.usuario.user.id,
      mensaje: texto,
      temasId: temaNum
    };

    console.log('Enviando mensaje:', payload);
    const sub = this.chatService.postMensaje(payload).subscribe({
      next: (resp: ChatResponse) => {
        if (resp?.chat) {
          this.mensajes.push(resp.chat);
          this.scrollAlFinal();
        }
        this.nuevaRespuesta = '';
      }
    });

    this.subscriptions.push(sub);
  }

  private scrollAlFinal(): void {
    const el = document.getElementById('mensajes');
    if (el) {
      setTimeout(() => el.scrollTop = el.scrollHeight, 0);
    }
  }

  crearTema() {
    this.visible = true;
  }

  handleClose() {
    this.visible = false;
    this.nombre = "";
  }

  save() {
    if (!this.nombre.trim()) return;

    const payload = { nombre: this.nombre };

    const sub = this.chatService.postTema(payload).subscribe({
      next: (resp: any) => {
        console.log("Tema guardado", resp);
        const nuevoTema = resp.tema;
        this.temas.push(nuevoTema);
        this.temaSeleccionado = nuevoTema.id;
        this.cargarMensajesDeTema();
        this.handleClose();
      },
      error: err => console.error("Error guardando tema", err)
    });

    this.subscriptions.push(sub);
  }

}
