import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Profile } from '../../models/Profile';

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    DatePipe,
    HttpClientModule,
  ],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss',
})
export class ProfileListComponent {
  title = 'Lista de Perfis';
  loading = true;
  profiles: Profile[] = [];
  displayedColumns = ['id', 'descricao'];
  feedback: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<Profile[]>('api/profiles').subscribe((data: Profile[]) => {
      this.profiles = data;
      this.loading = false;
      this.feedback = {};
    });
  }

  delete(profile: Profile): void {
    if (
      confirm(`Você tem certeza que deseja deletar ${profile.description}?`)
    ) {
      this.http.delete(`api/profiles/${profile.id}`).subscribe({
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
          this.feedback = { type: 'warning', message: 'Error deleting.' };
        },
      });
    }
  }

  protected readonly event = event;
}
