import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private userservice: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  user?: User

  editForm = this.formBuilder.group({
    userName: '',
    email: '',
    matricule: '',  
    password: '',
    phone_number: '',
    birthday: new Date(),
    role: '',
    cin: '',
  
    
  
  });

  editUser = () => {
    console.log(this.editForm);
    const values = this.editForm.value;
    this.userservice.editUser(
      new User(this.user!.id, values.userName!,values.email!, values.matricule!, values.password!,values.phone_number!, values.birthday!, values.role!,values.cin!)
    ).subscribe(
      user => 
      {
        console.log(user)
        this.router.navigate(['/users/profil'])
      }
    );
  }

  ngOnInit(): void {
    console.log('editUSer')
    this.activatedRoute.params.subscribe(
      params => {
        console.log(params['id'])
        this.userservice.getUserById(params['id']).subscribe(
          (res: any) => {
            this.user = new User(params['id'], '', '', '', '', '', new Date(), '','');
            
            this.user.userName = res.result.fullName
            this.user.email = res.result.email
            this.user.matricule = res.result.matricule
            this.user.password = res.result.password
            this.user.birthday = res.result.birthday
            this.user.role = res.result.role
            this.user.cin = res.result.cin
            


            this.editForm.setValue({
              userName: this.user.userName,
              email: this.user.email,
              matricule: this.user.matricule,
              password: this.user.password,
              phone_number: this.user.phone_number,
              birthday: new Date(this.user.birthday),
              role: this.user.role,
          
              cin: this.user.cin,
            })
          }
        )
      }
    )

  }
}
