import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      async (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          //Stockage des infos de l'utilisateur athentifié
          localStorage.setItem('joinUser', JSON.stringify(response.user));
          this.router.navigate(['tabs/tab2']);
        } else {
          const toast = await this.toastController.create({
            message: response.message,
            duration: 2000,
            color: 'danger',
          });
          toast.present();
        }
      },
      async (error) => {
        const toast = await this.toastController.create({
          message: 'Erreur de connexion',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      }
    );
  }
}



// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'http://127.0.0.1:8000/api'; // Remplace avec l'URL de ton API
//   public currentUserRole = new BehaviorSubject<string | null>(null);

//   constructor(private http: HttpClient, private router: Router) {}

//   // Méthode pour se connecter
//   login(email: string, password: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
//       tap((res) => {
//         if (res.token) {
//           // Stocker le token et l'information de l'utilisateur
//           localStorage.setItem('token', res.token);
//           this.currentUserRole.next(res.user.role); // Stocke le rôle
//         }
//       })
//     );
//   }

//   // Méthode pour rediriger l'utilisateur en fonction de son rôle
//   redirectByRole(role: string) {
//     switch (role) {
//       case 'doctor':
//         this.router.navigate(['/doctor-dashboard']);
//         break;
//       case 'user':
//         this.router.navigate(['/user-dashboard']);
//         break;
//       case 'accountant':
//         this.router.navigate(['/accountant-dashboard']);
//         break;
//       case 'secretary':
//         this.router.navigate(['/secretary-dashboard']);
//         break;
//       case 'admin':
//         this.router.navigate(['/admin-dashboard']);
//         break;
//       default:
//         this.router.navigate(['/login']);
//         break;
//     }
//   }

//   // Méthode pour obtenir les rôles actuels
//   getUserRole() {
//     return this.currentUserRole.asObservable();
//   }

//   logout() {
//     localStorage.removeItem('token');
//     this.currentUserRole.next(null);
//     this.router.navigate(['/login']);
//   }
// }
