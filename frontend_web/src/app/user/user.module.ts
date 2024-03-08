import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersListComponent } from './users-list/users-list.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserAddComponent } from './user-add/user-add.component';
import { EditControlleurComponent } from '../controller/edit-controlleur/edit-controlleur.component';
@NgModule({
  declarations: [


    UserLoginComponent,
    UserProfilComponent,
    UserEditComponent,
    UsersListComponent,
    UserAddComponent,
    EditControlleurComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
 
  ],
  
})
export class UserModule { }
