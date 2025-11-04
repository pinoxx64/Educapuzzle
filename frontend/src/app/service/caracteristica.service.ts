import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Caracteristica, CaracteristicaResponse } from '../interface/caracteristica';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService {
  constructor(private http: HttpClient) { }

  getCaracteristicas(): Observable<Caracteristica[]> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.get<{ caracteristicas: Caracteristica[] }>(`${environment.caracteristicaUrl}/`, { headers })
      .pipe(map(resp => resp.caracteristicas || []));
  }

  getCaracteristica(id: number): Observable<Caracteristica> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.get<CaracteristicaResponse>(`${environment.caracteristicaUrl}/${id}`, { headers })
      .pipe(map(resp => resp.caracteristica));
  }

  postCaracteristica(body: { nombre: string, idCategoria: number }): Observable<CaracteristicaResponse> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.post<CaracteristicaResponse>(`${environment.caracteristicaUrl}/`, body, { headers });
  }

  putCaracteristica(id: number, body: { nombre?: string, idCategoria?: number }): Observable<CaracteristicaResponse> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.put<CaracteristicaResponse>(`${environment.caracteristicaUrl}/${id}`, body, { headers });
  }

  deleteCaracteristica(id: number): Observable<HttpResponse<any>> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.delete<any>(`${environment.caracteristicaUrl}/${id}`, { headers, observe: 'response' });
  }
}