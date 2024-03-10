import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { UserService } from '../user/service/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {
  authenticated = false
 
  constructor(private userservice: UserService, private router: Router,public dialog: MatDialog ) { }



  ngOnInit(): void {
    console.log(this.authenticated)
    Emitters.authEmitter.subscribe(
      
      (auth: boolean) => {
        this.authenticated = auth
        console.log(this.authenticated)

      }
    )
  }
 
 
  



  logout(): void {

    this.userservice.logout().subscribe(
      (res: any) => {
        this.authenticated = false
        this.router.navigate([''])
      }
    )


  }

  


}
