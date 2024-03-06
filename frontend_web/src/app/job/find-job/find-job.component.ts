import { Component, OnInit } from '@angular/core';
import { JobService } from '../service/job.service';
import { Job } from '../model/job';
import { Company } from 'src/app/company/model/company';
import { CompanyService } from 'src/app/company/service/company.service';

@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.css']
})
export class FindJobComponent implements OnInit {

  jobs: Job[] = [];
  companys:Company[]=[];
  Jobs_found?:Number
  currentPage = 1;
  jobsPerPage = 5;

  constructor(private jobService:JobService,private companyService:CompanyService) {

  }

  
    
  getCurrentPageJobs(): any[] {
    const startIndex = (this.currentPage - 1) * this.jobsPerPage;
    const endIndex = startIndex + this.jobsPerPage;
    return this.jobs.slice(startIndex, endIndex);
  }

  // Fonction pour changer de page
  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.jobs.length / this.jobsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
  ngOnInit(): void {

    this.jobService.getJobs().subscribe(
      (res:any)=>{
        this.jobs=res.result
        this.Jobs_found=this.jobs.length
        console.log(this.jobs)
      },
      err =>{console.error(err)}
    )  

    this.getCompanies()
  }

  getCompanies():any{
   
    this.companyService.getCompanies().subscribe(
      (res:any)=>{
        this.companys=res.result
        console.log(res.result)

      }
    )
  
  }

}
