import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { User } from '../../models/User';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    DatePipe,
    HttpClientModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  title = 'Lista de Usuários';
  loading = true;
  users: User[] = [];
  displayedColumns = ['id', 'name'];
  feedback: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<User[]>('api/users').subscribe((data: User[]) => {
      this.users = data;
      this.loading = false;
      this.feedback = {};
    });
  }

  delete(user: User): void {
    if (confirm(`Você tem certeza que deseja deletar ${user.name}?`)) {
      this.http.delete(`api/users/${user.id}`).subscribe({
        next: () => {
          this.feedback = {
            type: 'Sucesso',
            message: 'Deletado com Sucesso!',
          };
          setTimeout(() => {
            this.ngOnInit();
          }, 1000);
        },
        error: () => {
          this.feedback = { type: 'warning', message: 'Erro ao deletar.' };
        },
      });
    }
  }

  protected readonly event = event;
}
