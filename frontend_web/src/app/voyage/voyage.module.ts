import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoyageRoutingModule } from './voyage-routing.module';
import { VoyageAddComponent } from './voyage-add/voyage-add.component';
import { VoyageEditComponent } from './voyage-edit/voyage-edit.component';
import { VoyageListComponent } from './voyage-list/voyage-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VoyageAddParMoisComponent } from './voyage-add-par-mois/voyage-add-par-mois.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import {MatFormFieldModule} from '@angular/material/form-field'; 

@NgModule({
  declarations: [
    VoyageAddComponent,
    VoyageEditComponent,
    VoyageListComponent,
    VoyageAddParMoisComponent
  ],
  imports: [
    CommonModule,
    VoyageRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule ,
    MatIconModule,
    MatButtonModule

  ]
})
export class VoyageModule { }
