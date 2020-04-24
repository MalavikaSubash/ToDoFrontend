import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full',
  },
  {
    path: 'Login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard Page'
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
