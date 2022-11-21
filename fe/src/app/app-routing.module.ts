import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardGuard} from './dashboard/guards/dashboard.guard';
import {LoginGuard} from './auth/guards/login.guard';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'candidates/:token',
    loadChildren: () => import('./candidates/candidates.module').then(m => m.CandidatesModule)
  },
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [DashboardGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
