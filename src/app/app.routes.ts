import { Routes } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';
import { HomeComponent } from './pages/home/home.component';
import { EmConstrucaoComponent } from './pages/em-construcao/em-construcao.component';
import { InserirClientesComponent } from './pages/inserir-clientes/inserir-clientes.component';

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
  {
    path: 'inserir-clientes',
    component: InserirClientesComponent,
  },
  {
    path: '**',
    component: EmConstrucaoComponent,
  },
];
