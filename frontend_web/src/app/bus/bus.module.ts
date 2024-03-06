import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusRoutingModule } from './bus-routing.module';
import { BusAddComponent } from './bus-add/bus-add.component';
import { BusListComponent } from './bus-list/bus-list.component';
import { BusEditComponent } from './bus-edit/bus-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BusAddComponent,
    BusListComponent,
    BusEditComponent
  ],
  imports: [
    CommonModule,
    BusRoutingModule,
    ReactiveFormsModule
  ]
})
export class BusModule { }
