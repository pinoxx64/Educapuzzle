import { Usuario, UsuarioResponse } from "../interface/usuario";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  login(body: any): Observable<UsuarioResponse> {
    console.log(body)
    return this.http.post<UsuarioResponse>(`${environment.usuarioUrl}/login`, body)
  }

  getUsers(): Observable<Usuario[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    console.log(headers)
    return this.http.get<{ users: Usuario[] }>(`${environment.usuarioUrl}/`, { headers }).pipe(
      map(response => response.users || [])
    );
  }

  getRanking(): Observable<Usuario[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    console.log(headers)
    return this.http.get<{ users: Usuario[] }>(`${environment.usuarioUrl}/ranking`, { headers }).pipe(
      map(response => response.users || [])
    );
  }

  putUser(user: Usuario): Observable<HttpResponse<Usuario>> {
    console.log(user)
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.put<Usuario>(`${environment.usuarioUrl}/${user.id}`, user, { headers, observe: 'response' });
  }

  softDeleteUser(id: number): Observable<HttpResponse<any>> {
    console.log(id)
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.delete<any>(`${environment.usuarioUrl}/${id}`, { headers, observe: 'response' })
  }

  activateUser(id: number): Observable<HttpResponse<any>> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<any>(`${environment.usuarioUrl}/activate/${id}`, { headers, observe: 'response' });
  }

  postUser(body: any): Observable<Usuario> {
    console.log(body)
    return this.http.post<Usuario>(`${environment.usuarioUrl}/`, body)
  }
}