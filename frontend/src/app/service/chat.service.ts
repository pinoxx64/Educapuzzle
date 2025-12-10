import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) { }

  getMensajesPorTemas(idTemas: Number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<{ messages: any[] }>(`${environment.chatUrl}/chats/${idTemas}`, { headers, observe: 'response' })
  }

  postMensaje(body: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.post<any>(`${environment.chatUrl}/`, body, { headers });
  }

  postTema(body: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.post<any>(`${environment.chatUrl}/tema`, body, { headers });
  }

  getNombreTemas(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<{ nombre: string }>(`${environment.chatUrl}/nombre`, { headers, observe: 'response' })
  }
}
