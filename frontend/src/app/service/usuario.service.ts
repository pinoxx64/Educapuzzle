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
}