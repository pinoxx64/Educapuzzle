import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Chat, ChatResponse } from '../../interface/chat';

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
  pollIntervalMs = 3000;
  private pollId: any = null;
  usuario: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarMensajes();
    this.pollId = setInterval(() => this.cargarMensajes(), this.pollIntervalMs);
  }

  ngOnDestroy(): void {
    if (this.pollId) clearInterval(this.pollId);
  }

  cargarMensajes(): void {
    this.http.get<Chat[]>('/api/chats')
      .subscribe({
        next: data => {
          this.mensajes = (data || []).sort((a, b) => a.id - b.id);
          this.scrollAlFinal();
        },
        error: err => console.error('Error cargando chats', err)
      });
  }

  enviarRespuesta(): void {
    const texto = (this.nuevaRespuesta || '').trim();
    if (!texto) return;
    const usuarioActual = sessionStorage.getItem('user');
    this.usuario = usuarioActual ? JSON.parse(usuarioActual) : { id: 0 };
    const payload = { usuId: this.usuario.id, mensaje: texto };
    console.log(payload);

    this.http.post<ChatResponse>('/api/chats', payload)
      .subscribe({
        next: resp => {
          // Si el backend responde con { chat: Chat } (ChatResponse)
          if ((resp as any)?.chat) {
            this.mensajes.push((resp as any).chat);
          } else if ((resp as any)?.id) {
            // Por compatibilidad: el backend podría devolver directamente el Chat
            this.mensajes.push(resp as any as Chat);
          } else {
            // fallback: recargar lista
            this.cargarMensajes();
          }
          this.nuevaRespuesta = '';
          this.scrollAlFinal();
        },
        error: err => {
          console.error('Error enviando mensaje', err);
          this.cargarMensajes();
        }
      });
  }

  // Helper: mostrar autor legible (solo tenemos usuId en la interfaz)
  autorDe(msg: Chat): string {
    return `Usuario ${msg.usuId ?? '?'}`;
  }

  private scrollAlFinal(): void {
    try {
      const el = document.getElementById('mensajes');
      if (el) el.scrollTop = el.scrollHeight;
    } catch (e) { /* noop */ }
  }
}