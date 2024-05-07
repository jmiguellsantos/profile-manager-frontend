import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { User } from '../../models/User';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatTooltipModule,
    RouterLink,
  ],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.scss',
})
export class UsersEditComponent {
  user!: User;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((p) => p['id']),
        switchMap((id) => {
          if (id === 'new') {
            return of(new User());
          }
          return this.http.get<User>(`api/users/${id}`);
        })
      )
      .subscribe({
        next: (user) => {
          this.user = user;
          this.feedback = {};
        },
        error: () => {
          this.feedback = { type: 'warning', message: 'Error ao carregar' };
        },
      });
  }

  save() {
    const id = this.user.id;
    const method = id ? 'put' : 'post';

    this.http[method](`/api/users${id ? '/' + id : ''}`, this.user).subscribe({
      next: () => {
        this.feedback = { type: 'success', message: 'Salvo com sucesso!' };
        setTimeout(async () => {
          await this.router.navigate(['/users']);
        }, 1000);
      },
      error: () => {
        this.feedback = { type: 'error', message: 'Erro ao salvar' };
      },
    });
  }

  async cancel() {
    await this.router.navigate(['/users']);
  }
}
