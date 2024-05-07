import { Routes } from '@angular/router';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersEditComponent } from './components/users-edit/users-edit.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profiles',
    component: ProfileListComponent,
  },
  {
    path: 'profiles/:id',
    component: ProfileEditComponent,
  },
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'users/:id',
    component: UsersEditComponent,
  },
];
