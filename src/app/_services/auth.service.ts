import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:44338/api/identidade/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'autenticar', {
      email: credentials.email,
      senha: credentials.senha
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'nova-conta', {
      email: user.email,
      senha: user.senha,
      senhaconfirmacao: user.senhaconfirmacao
    }, httpOptions);
  }
}
