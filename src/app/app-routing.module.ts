import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import {MainPageScreenComponent} from "./main-page-screen/main-page-screen.component";

export const APP_ROUTES = {
  'login_page': 'login',
  'main_page': 'main',
  'profile_page': 'profile',
  'schedule_page': 'schedule',
  'tabs_page': 'tabs'
}

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    loadChildren: async () => (await import('./pages/main/main.module')).MainPageModule
  },
  {
    path: APP_ROUTES.login_page, pathMatch: 'full',
    loadChildren: async () => (await import('./pages/login/login.module')).LoginPageModule
  },
  {
    path: APP_ROUTES.main_page, pathMatch: 'full',
    loadChildren: async () => (await import('./pages/main/main.module')).MainPageModule
  },
  {
    path: APP_ROUTES.profile_page, pathMatch: 'full',
    loadChildren: async () => (await import('./pages/profile/profile.module')).ProfilePageModule
  },
  {
    path: APP_ROUTES.schedule_page,
    loadChildren: () => import('./pages/schedule/schedule.module').then( m => m.SchedulePageModule)
  },

  // {
  //   path: APP_ROUTES.tabs_page,
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  // {
  //   path: 'main',
  //   loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  // }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
