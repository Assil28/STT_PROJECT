import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoyageListComponent } from './voyage-list/voyage-list.component';
import { VoyageAddComponent } from './voyage-add/voyage-add.component';
import { VoyageEditComponent } from './voyage-edit/voyage-edit.component';

const routes: Routes = [
  {path:"",component:VoyageListComponent},
  {path:"add_voyage",component:VoyageAddComponent},
  {path:"edit_voyage",component:VoyageEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoyageRoutingModule { }
