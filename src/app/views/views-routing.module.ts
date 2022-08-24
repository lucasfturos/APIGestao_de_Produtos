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
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsPageRoutingModule {}
