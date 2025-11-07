import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Objeto, ObjetoResponse } from '../interface/objeto';

import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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

  getObjetosPorCategoria(idCategoria: number) {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    const url = `${environment.objetoUrl}/categoria/${idCategoria}`;
    return this.http.get<any>(url, { headers }).pipe(
      tap(resp =>  resp))
  }

  getCaracteristicasPorObjeto(idObjeto: number) {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    const url = `${environment.objetoUrl}/caracteristicas/${idObjeto}`;
    return this.http.get<any>(url, { headers }).pipe(
      tap(resp =>  resp))
  }

  postObjeto(body: any): Observable<HttpResponse<Objeto>> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.post<Objeto>(`${environment.objetoUrl}/`, body, { headers, observe: 'response' });
  }

  putObjeto(objeto: Objeto): Observable<ObjetoResponse> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.put<ObjetoResponse>(`${environment.objetoUrl}/${objeto.id}`, objeto, { headers });
  }

  deleteObjeto(id: number): Observable<HttpResponse<any>> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.delete<any>(`${environment.objetoUrl}/${id}`, { headers, observe: 'response' });
  }
}