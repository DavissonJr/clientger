import { Routes } from '@angular/router';
import { ClientComponent } from './pages/home/client.component';

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
    path: 'clientes',
    component: ClientComponent,
  },
];
