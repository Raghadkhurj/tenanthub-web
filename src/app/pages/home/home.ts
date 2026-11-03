import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Auth } from '../../services/auth';
import { environment } from '../../../environments/environment';

interface CurrentUser {
  id: number;
  email: string;
  createdDate: string;
  tenant: { id: number; name: string; slug: string };
}

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private router = inject(Router);

  user = signal<CurrentUser | null>(null);
  loading = signal(true);
  errorMessage = signal('');

  ngOnInit() {
    this.http.get<CurrentUser>(`${environment.apiUrl}/current-user`).subscribe({
      next: (data) => {
        this.user.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Could not load your profile.');
      },
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}