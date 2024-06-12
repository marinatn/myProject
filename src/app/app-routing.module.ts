import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "./guards";
// import {MainPageScreenComponent} from "./main-page-screen/main-page-screen.component";

export const APP_ROUTES = {
  // patients
  'patients_page': 'patients',
  'patient_page': 'patient',

  // researches
  'researches_page': 'researches', // -
  'research_page': 'research', // -

  // tests
  'tests_page': 'tests',
  'test_page': 'test',

  // references
  'references_page': 'references',
  'reference_page': 'reference',

  // risks
  'risks_page': 'risks',
  'risk_page': 'risk',



  'login_page': 'login',
  'main_page': 'main',
  'profile_page': 'profile',
  'schedule_page': 'schedule',
  'bcp_page': 'bcp',
  'tabs_page': 'tabs',
  'analizators_page': 'analizators',
  'type_interaction_page': 'interaction',
  'doctors_page': 'doctors',
  'equipment_page': 'equipment',
  'apps_page': 'apps',

  // 'patients_page': 'patients',

  'samples_page': 'samples'
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
    loadChildren: async () => (await import('./pages/login/login.module')).LoginModule
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
  // {
  //   path: APP_ROUTES.schedule_page,
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./pages/schedule/schedule.module').then(m => m.SchedulePageModule)
  // },

  {
    path: APP_ROUTES.bcp_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/bcp/bcp.module').then(m => m.BCPPageModule)
  },

  {
    path: APP_ROUTES.analizators_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/analizators/analizators.module').then(m => m.AnalizatorsModule)
  },
  {
    path: APP_ROUTES.type_interaction_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/type-interaction/type-interaction.module').then(m => m.TypeInteractionModule)
  },

  {
    path: APP_ROUTES.doctors_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/doctors/doctors.module').then(m => m.DoctorsModule)
  },
  {
    path: APP_ROUTES.apps_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/applications/applications.module').then(m => m.ApplicationsModule)
  },
  {
    path: APP_ROUTES.equipment_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/equipment/equipment.module').then(m => m.EquipmentModule)
  },

  {
    path: APP_ROUTES.samples_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/samples/samples.module').then( m => m.SamplesModule)
  },


  // risks -> references -> tests -> researches -> patients

  // Patients
  {
    path: APP_ROUTES.patients_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/patients/list/patients.module').then(m => m.PatientsModule)
  },
  {
    path: APP_ROUTES.patient_page,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/patients/item/patient.module').then(m => m.PatientModule)
  },

  // Tests
  {
    path: APP_ROUTES.tests_page
    ,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tests/list/tests.module').then(m => m.TestsModule)
  },
  {
    path: APP_ROUTES.test_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tests/item/test.module').then(m => m.TestModule)
  },

  // References
  {
    path: APP_ROUTES.references_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/references/list/references.module').then(m => m.ReferencesModule)
  },
  {
    path: APP_ROUTES.reference_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/references/item/reference.module').then(m => m.ReferenceModule)
  },


  // Risks
  {
    path: APP_ROUTES.risks_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/risks/list/risks.module').then(m => m.RisksModule)
  },
  {
    path: APP_ROUTES.risk_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/risks/item/risk.module').then(m => m.RiskModule)
  },









  {
    path: APP_ROUTES.tests_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tests/list/tests.module').then(m => m.TestsModule)
  },

  // Researches
  {
    path: APP_ROUTES.researches_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/researches/list/researches.module').then(m => m.ResearchesModule)
  },


  // {
  //   path: APP_ROUTES.research_page,
  //   canActivate: [AuthGuard],
  //   loadChildren: () => {
  //     return import('./pages/researches/item/research.module').then(m => m.ResearchModule);
  //   }
  // },
  // {
  //   path: APP_ROUTES.login_page2,
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginModule)
  // },
  // {
  //   path: 'login123',
  //   loadChildren: () => import('./pages/login123/login123.module').then( m => m.LoginPageModule)
  // },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
