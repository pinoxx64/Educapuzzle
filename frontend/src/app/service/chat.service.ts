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

  getMensajes(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<{ messages: any[] }>(`${environment.chatUrl}/`, { headers, observe: 'response' })
  }

  postMensaje(body: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.post<any>(`${environment.chatUrl}/`, body, { headers });
  }
}
