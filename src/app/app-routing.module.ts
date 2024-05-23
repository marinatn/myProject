import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {AuthGuard} from "./guards";
import {TypeInteractionModule} from "./pages/type-interaction/type-interaction.module";
// import {MainPageScreenComponent} from "./main-page-screen/main-page-screen.component";

export const APP_ROUTES = {
  'login_page': 'login',
  'main_page': 'main',
  'profile_page': 'profile',
  'schedule_page': 'schedule',
  'bcp_page': 'bcp',
  'tabs_page': 'tabs',
  'timing_page': 'timing',
  'analizators_page': 'analizators',
  'type_interaction_page': 'interaction',
  'doctors_page': 'doctors',
  'equipment_page': 'equipment'
}

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/main/main.module')).MainPageModule
  },
  {
    path: APP_ROUTES.login_page,
    pathMatch: 'full',
    loadChildren: async () => (await import('./pages/login/login.module')).LoginPageModule
  },
  {
    path: APP_ROUTES.main_page,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/main/main.module')).MainPageModule
  },
  // {
  //   path: APP_ROUTES.profile_page,
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   loadChildren: async () => (await import('./pages/profile/profile.module')).ProfilePageModule
  // },
  {
    path: APP_ROUTES.schedule_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: APP_ROUTES.bcp_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/bcp/bcp.module').then( m => m.BCPPageModule)
  },
  {
    path: APP_ROUTES.timing_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/timing/timing.module').then( m => m.TimingModule)
  },

  {
    path: APP_ROUTES.analizators_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/analizators/analizators.module').then( m => m.AnalizatorsModule)
  },

  {
    path: APP_ROUTES.type_interaction_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/type-interaction/type-interaction.module').then( m => m.TypeInteractionModule)
  },

  {
    path: APP_ROUTES.doctors_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/doctors/doctors.module').then( m => m.DoctorsModule)
  },


  {
    path: APP_ROUTES.equipment_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/equipment/equipment.module').then( m => m.EquipmentModule)
  },



  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  // {

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
