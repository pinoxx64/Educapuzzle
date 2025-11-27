import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstadisticaService {
  constructor(private http: HttpClient) { }

  getEstadisticas(usuId: number): Observable<any> {
    const token = sessionStorage.getItem('token') || '';
    return this.http.get<any>(`${environment.estadisticasUrl}/${usuId}`, {
      headers: { token }
    });
  }

  postEstadisticas(body: any) {
    const token = sessionStorage.getItem('token') || '';
    return this.http.post<any>(`${environment.estadisticasUrl}/`, body, {
      headers: { token }
    });
  }

  sumarSudokuJugados(usuId: number) {
    const token = sessionStorage.getItem('token') || '';
    return this.http.put<any>(`${environment.estadisticasUrl}/sumarSudokuJugados/${usuId}`, {}, {
      headers: { token }
    });
  }

  sumarSudokuGanados(usuId: number) {
    const token = sessionStorage.getItem('token') || '';
    return this.http.put<any>(`${environment.estadisticasUrl}/sumarSudokuGanados/${usuId}`, {}, {
      headers: { token }
    });
  }
}
