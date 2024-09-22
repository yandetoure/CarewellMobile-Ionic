import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./auth/inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./auth/connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./portail/patient/patient.module').then( m => m.PatientPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
