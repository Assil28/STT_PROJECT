import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {path:'login', component: UserLoginComponent},
  {path:'register', component: UserRegisterComponent},
  {path:'profil', component: UserProfilComponent},
  {path:'edituser/:id', component: UserEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
