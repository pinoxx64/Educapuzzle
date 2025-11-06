import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Categoria, CategoriaResponse } from '../interface/categoria';
import { Puzzle } from '../interface/puzzle';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<{ categorias: Categoria[] }>(`${environment.categoriaUrl}/`, { headers }).pipe(
      map(response => response.categorias || [])
    )
  }

  getCategoria(id: number): Observable<Categoria> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<{ categorias: Categoria }>(`${environment.categoriaUrl}/${id}`, { headers }).pipe(
      map(response => response.categorias || [])
    )
  }

  getPuzzle(): Observable<Puzzle[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<{ puzzles: Puzzle[] }>(`${environment.categoriaUrl}/puzzles`, { headers }).pipe(
      map(response => response.puzzles || [])
    )
  }

  putCategoria(categoria: Categoria): Observable<HttpResponse<Categoria>> {
    console.log(categoria)
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.put<Categoria>(`${environment.categoriaUrl}/${categoria.id}`, categoria, { headers, observe: 'response' });
  }

  postCategoria(body: any): Observable<HttpResponse<Categoria>> {
    console.log(body)
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.post<Categoria>(`${environment.categoriaUrl}/`, body, { headers, observe: 'response' })
  }

  deleteCategoria(id: number): Observable<HttpResponse<any>> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.delete<any>(`${environment.categoriaUrl}/${id}`, { headers, observe: 'response' })
  }
}
