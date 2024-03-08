import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserService } from '../user/service/user.service';
import { User } from '../user/model/user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements  OnInit, OnDestroy{

  @Input() sidenav!: MatSidenav; // Input decorator to receive the sidenav from the parent component

  isMobile: boolean = false;
  observer: ResizeObserver | null = null;
user:User
userid:any

  constructor(private elementRef: ElementRef,private userService:UserService,private router: Router) {
    this.user = new User("","","", "","",  "",new Date() ,"","")
    this.userid=localStorage.getItem("user_id")
    
    console.log(this.userid)
  }
 

 

   
      
  ngOnInit() {
      this.userService.userLogin().subscribe(
      res=>{
        this.user=res
        console.log(this.user);
      },
      err =>{
        console.error(err)
        this.router.navigate(['/users/login'])
      }
    ) 
    this.observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (entry.contentRect.width <= 800) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
    });

    if (this.observer) {
      this.observer.observe(this.elementRef.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  toggleMenu() {
    if (this.isMobile && this.sidenav) {
      this.sidenav.toggle();
    }
  }
}