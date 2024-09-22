import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Remplace avec l'URL de ton API
  public currentUserRole = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode pour se connecter
  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).subscribe((res: any) => {
      // Stocker le token, les informations de l'utilisateur, etc.
      localStorage.setItem('token', res.token);
      this.currentUserRole.next(res.user.role); // Stocke le rôle
      this.redirectByRole(res.user.role); // Redirection basée sur le rôle
    });
  }

  // Méthode pour rediriger l'utilisateur en fonction de son rôle
  redirectByRole(role: string) {
    switch (role) {
      case 'doctor':
        this.router.navigate(['/doctor-dashboard']);
        break;
      case 'user':
        this.router.navigate(['/user-dashboard']);
        break;
      case 'accountant':
        this.router.navigate(['/accountant-dashboard']);
        break;
      case 'secretary':
        this.router.navigate(['/secretary-dashboard']);
        break;
      case 'admin':
        this.router.navigate(['/admin-dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }

  // Méthode pour obtenir les rôles actuels
  getUserRole() {
    return this.currentUserRole.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserRole.next(null);
    this.router.navigate(['/login']);
  }
}
