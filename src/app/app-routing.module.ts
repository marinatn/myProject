import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {MainPageScreenComponent} from "./main-page-screen/main-page-screen.component";

export const APP_ROUTES = {
  'main_page': 'main',
  'profile_page': 'profile',
  'tabs_page': 'tabs'
}

const routes: Routes = [
  {
    path: APP_ROUTES.main_page,
    loadComponent: () => import('./main-page-screen/main-page-screen.component').then(m => m.MainPageScreenComponent)
  },
  {
    path: APP_ROUTES.profile_page,
    loadComponent: () => import('./profile-page/profile-page.component').then(m => m.ProfilePageComponent)
  },
  {
    path: APP_ROUTES.tabs_page,
      loadComponent: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
