import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Objeto, ObjetoResponse } from '../interface/objeto';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {
  constructor(private http: HttpClient) { }

  getObjetos(): Observable<Objeto[]> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.get<{ objetos: Objeto[] }>(`${environment.objetoUrl}/`, { headers })
      .pipe(map(resp => resp.objetos || []));
  }

  getObjeto(id: number): Observable<Objeto> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.get<ObjetoResponse>(`${environment.objetoUrl}/${id}`, { headers })
      .pipe(map(resp => resp.objeto));
  }

  postObjeto(body: { nombre: string, idCategoria: number }): Observable<ObjetoResponse> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.post<ObjetoResponse>(`${environment.objetoUrl}/`, body, { headers });
  }

  putObjeto(id: number, body: { nombre?: string, idCategoria?: number }): Observable<ObjetoResponse> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.put<ObjetoResponse>(`${environment.objetoUrl}/${id}`, body, { headers });
  }

  deleteObjeto(id: number): Observable<HttpResponse<any>> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.delete<any>(`${environment.objetoUrl}/${id}`, { headers, observe: 'response' });
  }
}