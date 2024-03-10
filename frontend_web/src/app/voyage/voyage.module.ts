import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoyageRoutingModule } from './voyage-routing.module';
import { VoyageAddComponent } from './voyage-add/voyage-add.component';
import { VoyageEditComponent } from './voyage-edit/voyage-edit.component';
import { VoyageListComponent } from './voyage-list/voyage-list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VoyageAddComponent,
    VoyageEditComponent,
    VoyageListComponent
  ],
  imports: [
    CommonModule,
    VoyageRoutingModule,
    ReactiveFormsModule
  ]
})
export class VoyageModule { }
