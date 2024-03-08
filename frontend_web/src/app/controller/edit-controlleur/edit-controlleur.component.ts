import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../user/service/user.service';
import { UserAddComponent } from '../../user/user-add/user-add.component';
import { ControllerService } from '../service/controller.service';

@Component({
  selector: 'app-edit-controlleur',
  templateUrl: './edit-controlleur.component.html',
  styleUrls: ['./edit-controlleur.component.css'],
  providers: [DatePipe],
})
export class EditControlleurComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe, private router:Router,private formBuilder: FormBuilder,private http : HttpClient,public dialogRef: MatDialogRef<UserAddComponent>,private service : ControllerService,
  ) {this.userForm = this.formBuilder.group({
    userName:data.controllerforEdit.userName,
    email:data.controllerforEdit.email,
    phone_number:data.controllerforEdit.phone_number,
    cin:data.controllerforEdit.cin,
    birthday:data.controllerforEdit.birthday

   });
 }


@Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
 showModal = true;
 userForm: FormGroup;

 ngOnInit(): void {
  console.log('Data passed to dialog:', this.data.controllerforEdit._id);

}

 close(): void {
  this.dialogRef.close();
}


async submitForm(): Promise<void> {

try {
 // zid validators
 this.service.editController(this.data.controllerforEdit._id, this.userForm.value).subscribe(
  (response) => {
    console.log('controller edit successfully:', response);
    this.close();
  },
  (error) => {
    console.error('Failed to edit controller:', error);
  }
);
 
} catch (error) {
  console.error('Error during form submission:', error);

}
}
}