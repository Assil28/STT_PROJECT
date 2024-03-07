import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  error=false;

  constructor(private router:Router, private formBuilder: FormBuilder, private userService: UserService) {

  }
  form = this.formBuilder.group({
    matricule: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void {

  }

  login(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      this.userService.login(this.form.value).subscribe(
        (res) => {
          console.log(res);
          this.userService.userLogin().subscribe(
            (userRes: any) => {
              console.log(userRes)
              localStorage.setItem('user_id', userRes._id);
              Emitters.authEmitter.emit(true);
              this.router.navigate(['/users/profil']);
            },
            (err) => {
              console.error(err);
            }
          );
        },
        (error: Error) => {
          console.log(error);
          this.error = true;
          Emitters.authEmitter.emit(false);
        }
      );
    }
    
  }
  

}
