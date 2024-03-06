import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {


  constructor(private router:Router,private formBuilder: FormBuilder, private userService: UserService) {

  }
  form = this.formBuilder.group({
    fullName: ['', Validators.required],
    description: '',
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    status: ['', Validators.required],
    company: '', // <-- New FormControl for the company
    adresse: ['', Validators.required],
    birthday: [null, Validators.required], // Assuming birthday is a required field
    skills: '',
  })

  form2 = this.formBuilder.group({
    retypepassword: new FormControl('', [Validators.required, this.passwordMatchValidator.bind(this)]),
  });
  
  // Custom validator for password confirmation
  passwordMatchValidator(control: FormControl): { [key: string]: boolean } | null {
    const password = this.form.get('password')?.value;
  
    return control.value === password ? null : { a: true };
  }
  ngOnInit(): void {

    this.userService.getUsers().subscribe(
      res=>{
        console.log(res)
      }
    )

  }


  register() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.userService.createUser(this.form.value).subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/users/login'])

        },
        (error: Error) => {
          console.log(error)
        }
      );
    }


  }


}
