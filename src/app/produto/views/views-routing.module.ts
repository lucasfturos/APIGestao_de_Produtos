import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewsPage } from './views.page';

const routes: Routes = [
  {
    path: '',
    component: ViewsPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'create/:cod_bar',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('../../config/config.module').then( m => m.ConfigPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsPageRoutingModule {}
