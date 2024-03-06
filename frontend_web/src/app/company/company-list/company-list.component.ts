import { Component, OnInit } from '@angular/core';
import { Company } from '../model/company';
import { Subscription } from 'rxjs';
import { CompanyService } from '../service/company.service';
import { CompanyAddComponent } from '../company-add/company-add.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[]=[];
  subscription? : Subscription;
  companiesFound?:Number
  currentPage = 1;
  companiesPerPage = 5;
  showAddCompanyModal = false;


  constructor(private service : CompanyService,public dialog: MatDialog ){}

getCurrentPageCompanies(): any[] {

  const startIndex = (this.currentPage - 1) * this.companiesPerPage;
  const endIndex = startIndex + this.companiesPerPage;
  return this.companies.slice(startIndex, endIndex);
}

// Fonction pour changer de page
changePage(pageNumber: number): void {
  this.currentPage = pageNumber;
}
getPageNumbers(): number[] {
  const pageCount = Math.ceil(this.companies.length / this.companiesPerPage);
  return Array.from({ length: pageCount }, (_, index) => index + 1);
}
ngOnInit(): void {

  this.service.getCompanies().subscribe(
    (res:any)=>{
      this.companies=res.result
      this.companiesFound=this.companies.length
      console.log(this.companies)
    },
    err =>{console.error(err)}
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

}