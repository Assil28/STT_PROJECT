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
    fullName: '',
    description: '',
    email: '',
    status: '',  // <-- Initialize with an empty string
    adresse: '',
    birthday: new Date(),
    skills: '',
    pdf: '',
    image: ''
  });

  editUser = () => {
    //console.log(this.editForm);
    const values = this.editForm.value;
    this.userservice.editUser(
      new User(this.user!.id, values.fullName!, values.description!, values.email!,"", values.status!, values.adresse!, values.birthday!, values.skills!, values.pdf!, values.image!)
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
            this.user = new User(params['id'], '', '', '', '', '', '', new Date(), '', '', '');
            
            this.user.fullName = res.result.fullName
            this.user.description = res.result.description
            this.user.email = res.result.email
            this.user.status = res.result.status
            this.user.adresse = res.result.adresse
            this.user.birthday = res.result.birthday
            this.user.skills = res.result.skills
            


            this.editForm.setValue({
              fullName: this.user.fullName,
              description: this.user.description,
              email: this.user.email,
              status: this.user.status,
              adresse: this.user.adresse,
              birthday: new Date(this.user.birthday),
              skills: this.user.skills,
          
              pdf: this.user.pdf,
              image:  this.user.image
            })
          }
        )
      }
    )

  }
}
