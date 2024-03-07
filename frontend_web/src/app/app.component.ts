import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter, takeUntil } from 'rxjs';
import { UserService } from './user/service/user.service';
import { Emitters } from './emitters/emitters';
;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  authenticated = false
  isMobile: boolean = false;
  observer: ResizeObserver | null = null;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  constructor(private userservice: UserService, private router: Router ) { }

  ngOnInit(): void {
    console.log(this.authenticated)
    Emitters.authEmitter.subscribe(
      
      (auth: boolean) => {
        this.authenticated = auth
        console.log(this.authenticated)

      }
    )
  }
  toggleSidebar() {
    this.sidenav.toggle();
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
