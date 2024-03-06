import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { Emitters } from 'src/app/emitters/emitters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  user: User;
  userid:any
  authenticated = false
  

  constructor(private userService:UserService,private router: Router) {

    this.user = new User("","","", "","",  "", "",new Date(), "","","")
    this.userid=localStorage.getItem("user_id")
    console.log(this.userid)
  }
    
  
  ngOnInit(): void {
    
    this.userService.userLogin().subscribe(
      res=>{
        this.user=res
      },
      err =>{
        console.error(err)
        this.router.navigate(['/users/login'])
      }
    ) 
    
  }

  


}
