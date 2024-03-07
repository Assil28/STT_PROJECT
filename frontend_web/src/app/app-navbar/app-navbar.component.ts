import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { UserService } from '../user/service/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CompanyAddComponent } from '../company/company-add/company-add.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {
  authenticated = false
  showAddCompanyModal = false;
  isMobile: boolean = false;
  observer: ResizeObserver | null = null;
  sidenav!: MatSidenav;
  isCollapsed = true;
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
 
  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
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
