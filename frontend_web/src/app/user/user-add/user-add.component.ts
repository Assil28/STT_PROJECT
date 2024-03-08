import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private router:Router,private formBuilder: FormBuilder,private http : HttpClient,public dialogRef: MatDialogRef<UserAddComponent>,private service : UserService,
  ) {this.userForm = this.formBuilder.group({
    userName:"",
    email:"",
    password:"",
    phone_number:"",
    cin:"",
    birthday:""

   });
  // Initialize Cloudinary with your Cloudinary credentials
 }


@Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
 showModal = true;
 userForm: FormGroup;

 ngOnInit(): void {
 
}

 close(): void {
  this.dialogRef.close();
}


async submitForm(): Promise<void> {
try {
 
  
  const busData = new FormData();
  busData.append('userName', this.userForm.get('userName')!.value);
  busData.append('email', this.userForm.get('email')!.value);
  busData.append('password', this.userForm.get('password')!.value);
  busData.append('phone_number', this.userForm.get('phone_number')!.value);
  busData.append('cin', this.userForm.get('cin')!.value);
  busData.append('birthday', this.userForm.get('birthday')!.value);
  
  console.log(this.userForm.value)
  this.service.createUser(this.userForm.value).subscribe(
    (response) => {
      console.log('add user successfully:', response);
      // Handle success, e.g., navigate to a success page
    },
    (error) => {
      console.error('Failed to add user:', error);
    }
  );
} catch (error) {
  console.error('Error during form submission:', error);

}
}
}