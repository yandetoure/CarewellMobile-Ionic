import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adress: ['', Validators.required],
      call: ['', Validators.required],
      day_of_birth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator }); // Ajout du validateur
  }

  // Validateur pour vérifier que les mots de passe correspondent
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('password_confirmation')?.value ? null : { 'mismatch': true };
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(
        this.registerForm.value.first_name,
        this.registerForm.value.last_name,
        this.registerForm.value.email,
        this.registerForm.value.adress,
        this.registerForm.value.call,
        this.registerForm.value.day_of_birth,
        this.registerForm.value.password,
        this.registerForm.value.password_confirmation
      ).subscribe(response => {
        // Gérer l'inscription réussie
        this.router.navigate(['/login']);
      }, error => {
        // Gérer les erreurs
        console.error(error);
        // Afficher un message d'erreur à l'utilisateur
      });
    }
  }
}
