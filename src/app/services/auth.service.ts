import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Changez l'URL si nécessaire
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // Méthode pour s'enregistrer
  register(
    firstName: string, 
    lastName: string, 
    email: string, 
    address: string, 
    call: string, 
    dayOfBirth: string, 
    password: string, 
    passwordConfirmation: string, // Nouveau champ pour confirmer le mot de passe
    photo?: File
  ): Observable<any> {
    const formData = new FormData();

    // Ajout des champs obligatoires
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('adress', address);
    formData.append('call', call);
    formData.append('day_of_birth', dayOfBirth);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation); // Ajout du mot de passe de confirmation

    // Gestion du fichier photo si fourni
    if (photo) {
      formData.append('photo', photo);
    }

    return this.http.post<any>(`${this.apiUrl}/register`, formData);
  }

  // Méthode pour se connecter
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // Méthode pour se déconnecter
  logout(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/logout`, { headers: this.getAuthHeaders() });
  }

  // Stocker le token
  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  // Obtenir le token
  getToken() {
    return localStorage.getItem('token');
  }

  // Supprimer le token et rediriger vers la page de login
  clearToken() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Méthode pour obtenir les utilisateurs
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`, { headers: this.getAuthHeaders() });
  }

  // Méthode pour obtenir les informations utilisateur
  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers: this.getAuthHeaders() });
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && token !== undefined;
  }

  // Méthode privée pour obtenir les en-têtes d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
