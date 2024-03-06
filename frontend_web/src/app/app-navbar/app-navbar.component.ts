import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { UserService } from '../user/service/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CompanyAddComponent } from '../company/company-add/company-add.component';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {
  authenticated = false
  showAddCompanyModal = false;

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

  openAddCompanyModal() {
    this.showAddCompanyModal = true;
  }
  
  closeAddCompanyModal(event: boolean) {
    this.showAddCompanyModal = event;
  }
  openAddCompanyDialog(): void {
    const dialogRef = this.dialog.open(CompanyAddComponent, {
      width: '600px', // Adjust width as needed
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
