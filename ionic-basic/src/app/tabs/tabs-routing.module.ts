
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tabs1',
        loadChildren: () => import('../tabs1/tabs1.module').then(m => m.Tabs1PageModule)
      },
      {
        path: 'tabs2',
        loadChildren: () => import('../tabs2/tabs2.module').then(m => m.Tabs2PageModule)
      },
      {
        path: 'tabs3',
        loadChildren: () => import('../tabs3/tabs3.module').then(m => m.Tabs3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}