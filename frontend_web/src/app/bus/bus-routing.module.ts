import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusListComponent } from './bus-list/bus-list.component';
import { BusAddComponent } from './bus-add/bus-add.component';
import { BusEditComponent } from './bus-edit/bus-edit.component';

const routes: Routes = [
  {path:"",component:BusListComponent},
  {path:"add_bus",component:BusAddComponent},
  {path:"edit_bus",component:BusEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusRoutingModule { }
