import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/Profile';
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

@Component({
  selector: 'app-profile-edit',
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
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent implements OnInit {
  profile!: Profile;
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
            return of(new Profile());
          }
          return this.http.get<Profile>(`api/profiles/${id}`);
        })
      )
      .subscribe({
        next: (profile) => {
          this.profile = profile;
          this.feedback = {};
        },
        error: () => {
          this.feedback = { type: 'warning', message: 'Error ao carregar' };
        },
      });
  }

  save() {
    const id = this.profile.id;
    const method = id ? 'put' : 'post';

    this.http[method](
      `/api/profiles${id ? '/' + id : ''}`,
      this.profile
    ).subscribe({
      next: () => {
        this.feedback = { type: 'success', message: 'Salvo com sucesso!' };
        setTimeout(async () => {
          await this.router.navigate(['/profiles']);
        }, 1000);
      },
      error: () => {
        this.feedback = { type: 'error', message: 'Erro ao salvar' };
      },
    });
  }

  async cancel() {
    await this.router.navigate(['/profiles']);
  }
}
