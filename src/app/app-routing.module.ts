import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "./guards";
import {QrReaderPageModule} from "./pages/qr_reader/qr.reader.page.module";

export const APP_ROUTES = {
  // orders
  'orders_page': 'orders',
  'order_page': 'order',

  // patients
  'patients_page': 'patients',
  'patient_page': 'patient',

  // researches
  'researches_page': 'researches',
  'research_page': 'research',

  // tests
  'tests_page': 'tests',
  'test_page': 'test',

  // references
  'references_page': 'references',
  'reference_page': 'reference',

  // risks
  'risks_page': 'risks',
  'risk_page': 'risk',

  // doctors
  'doctors_page': 'doctors',
  'doctor_page': 'doctor',

  // qr reader
  'qr_reader_page': 'qr',



  'login_page': 'login',
  'main_page': 'main',

  'profile_page': 'profile',
  'schedule_page': 'schedule',
  'bcp_page': 'bcp',
  'tabs_page': 'tabs',
  'analysers_page': 'analysers',
  'type_interaction_page': 'interaction',
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

  {
    path: APP_ROUTES.qr_reader_page,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/qr_reader/qr.reader.page.module').then(m => m.QrReaderPageModule)
  },


  // risks -> references -> tests -> researches -> orders (researches with patient)

  // Orders
  {
    path: APP_ROUTES.orders_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/orders/list/orders.module').then(m => m.OrdersModule)
  },
  {
    path: APP_ROUTES.order_page,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/orders/item/order.module').then(m => m.OrderModule)
  },

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

  // Researches
  {
    path: APP_ROUTES.researches_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/researches/list/researches.module').then(m => m.ResearchesModule)
  },
  {
    path: APP_ROUTES.research_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/researches/item/research.module').then(m => m.ResearchModule)
  },

  // Tests
  {
    path: APP_ROUTES.tests_page,
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

  // Doctors
  {
    path: APP_ROUTES.doctors_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/doctors/list/doctors.module').then(m => m.DoctorsModule)
  },
  {
    path: APP_ROUTES.doctor_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/doctors/item/doctor.module').then(m => m.DoctorModule)
  },


  // hz
  // {
  //   path: APP_ROUTES.profile_page,
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   loadChildren: async () => (await import('./pages/profile/profile.module')).ProfilePageModule
  // },



  {
    path: APP_ROUTES.analysers_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/analizators/analizators.module').then(m => m.AnalizatorsModule)
  },
  {
    path: APP_ROUTES.type_interaction_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/type-interaction/type-interaction.module').then(m => m.TypeInteractionModule)
  },

  {
    path: APP_ROUTES.equipment_page,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/equipment/equipment.module').then(m => m.EquipmentModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
