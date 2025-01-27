import { Routes } from '@angular/router';
import { ListasTarefasComponent } from './views/listas-tarefas/listas-tarefas.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listaTarefas',
    pathMatch: 'full',
    data: {
      reuseComponent: true
    }
  },
  {
    path: 'listaTarefas',
    component: ListasTarefasComponent,
    data: {
      reuseComponent: true
    }
  }
];
