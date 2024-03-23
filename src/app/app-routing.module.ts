import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {MainPageScreenComponent} from "./main-page-screen/main-page-screen.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main-page-screen/main-page-screen.component').then(m => m.MainPageScreenComponent)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile-page/profile-page.component').then(m => m.ProfilePageComponent)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
