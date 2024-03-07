import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements  OnInit, OnDestroy{

  @Input() sidenav!: MatSidenav; // Input decorator to receive the sidenav from the parent component

  isMobile: boolean = false;
  observer: ResizeObserver | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
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