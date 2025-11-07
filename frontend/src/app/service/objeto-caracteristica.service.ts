import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ObjetoCaracteristica, ObjetoCaracteristicaResponse } from '../interface/objeto-caracteristica';

@Injectable({
  providedIn: 'root'
})
export class ObjetoCaracteristicaService {
  constructor(private http: HttpClient) { }

  getPorObjeto(idObjeto: number): Observable<ObjetoCaracteristica[]> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.get<{ relaciones: ObjetoCaracteristica[] }>(`${environment.objetoCaracteristicaUrl}/objeto/${idObjeto}`, { headers })
      .pipe(map(resp => resp.relaciones || []));
  }

  getPorCaracteristica(idCaracteristica: number): Observable<ObjetoCaracteristica[]> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.get<{ relaciones: ObjetoCaracteristica[] }>(`${environment.objetoCaracteristicaUrl}/caracteristica/${idCaracteristica}`, { headers })
      .pipe(map(resp => resp.relaciones || []));
  }

  getRelacion(idObjeto: number, idCaracteristica: number): Observable<ObjetoCaracteristica | null> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.get<{ relacion: ObjetoCaracteristica | null }>(`${environment.objetoCaracteristicaUrl}/${idObjeto}/${idCaracteristica}`, { headers })
      .pipe(map(resp => resp.relacion || null));
  }

  postRelacion(body: { idObjetos: number, idCaracteristica: number }): Observable<ObjetoCaracteristicaResponse> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.post<ObjetoCaracteristicaResponse>(`${environment.objetoCaracteristicaUrl}/`, body, { headers });
  }

  deleteRelacion(idObjeto: number, idCaracteristica: number): Observable<HttpResponse<any>> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.delete<any>(`${environment.objetoCaracteristicaUrl}/${idObjeto}/${idCaracteristica}`, { headers, observe: 'response' });
  }
}