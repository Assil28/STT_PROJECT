import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user/user-login/user-login.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  
  {
    path: 'users',
    loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule),
     
  },

  {
    path: 'companies',
    loadChildren: () => import('./company/company.module')
      .then(m => m.CompanyModule),
     
  },

  {
    path: 'jobs',
    loadChildren: () => import('./job/job.module')
      .then(m => m.JobModule),
     
  },

  {
    path: 'voyage',
    loadChildren: () => import('./voyage/voyage.module')
      .then(m => m.VoyageModule),
     
  },
  {
    path: 'bus',
    loadChildren: () => import('./bus/bus.module')
      .then(m => m.BusModule),
     
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
