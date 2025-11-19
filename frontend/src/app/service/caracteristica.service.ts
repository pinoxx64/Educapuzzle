import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Caracteristica, CaracteristicaResponse } from '../interface/caracteristica';
import { tap } from 'rxjs/operators';
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

  getCaracteristicasPorCategoria(idCategria: number) {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    const url = `${environment.caracteristicaUrl}/categoria/${idCategria}`;
    return this.http.get<any>(url, { headers }).pipe(
      tap(resp =>  console.log(resp.caracteristica)))
  }

  postCaracteristica(body: any): Observable<CaracteristicaResponse> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.post<CaracteristicaResponse>(`${environment.caracteristicaUrl}/`, body, { headers });
  }

  putCaracteristica(carac: Caracteristica): Observable<CaracteristicaResponse> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.put<CaracteristicaResponse>(`${environment.caracteristicaUrl}/${carac.id}`, carac, { headers });
  }

  deleteCaracteristica(id: number): Observable<HttpResponse<any>> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('token', token);
    return this.http.delete<any>(`${environment.caracteristicaUrl}/${id}`, { headers, observe: 'response' });
  }
}