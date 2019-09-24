import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private autenticado: boolean = false
  
  constructor() { }

  isAuthenticated(): boolean {
    return this.autenticado;
  }

  login(user: string, senha: string): boolean{
    return this.autenticado = (user === 'ADMIN' && senha === '1234')
  }
}

