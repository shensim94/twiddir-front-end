import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl: string = `${environment.baseUrl}/login`;
  private registerUrl: string = `${environment.baseUrl}/register`;

  constructor(private httpClient: HttpClient) { }

  onLogin(data: any) {
    return this.httpClient.post<any>(this.loginUrl, data);
  }

  onRegister(data: any) {
    return this.httpClient.post<any>(this.registerUrl, data);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return this.isTokenValid(token);
  }
  
  private isTokenValid(token: string): boolean {
    return true; // Replace with actual validation
  }
}
