import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private routerClient = inject(Router);
  private authClient = inject(Auth);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    companySlug: new FormControl('', [Validators.required]),
  });
  loading = signal(false);
  errorMessage = signal('');
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, companySlug, password } = this.loginForm.value;

    this.loading.set(true);
    this.errorMessage.set('');

    this.authClient.login(email!, password!, companySlug!).subscribe({
      next: () => {
        this.loading.set(false);
        this.routerClient.navigate(['/home']);
      },
      error: (err) => {
        this.loading.set(false);
        if (err.status === 401) {
          this.errorMessage.set('invalid email, password or company');
        } else {
          this.errorMessage.set('could not reach the server ,try again');
        }
      },
    });
  }
}
