import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/application/model/application';
import { ApplicationService } from 'src/app/application/service/application.service';
import { CompanyService } from 'src/app/company/service/company.service';
import { JobService } from '../service/job.service';
import { Job } from '../model/job';
import { Company } from 'src/app/company/model/company';

@Component({
  selector: 'app-postuled-job',
  templateUrl: './postuled-job.component.html',
  styleUrls: ['./postuled-job.component.css']
})
export class PostuledJobComponent implements OnInit {

  applications: Application[] = []
  user_id: any
  jobs: Job[] = []
  companys: Company[] = []



  currentPage = 1;
  jobsPerPage = 5;

  Applications_found?: Number
  constructor(private applicationService: ApplicationService, private companyService: CompanyService, private jobService: JobService) { }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id')
    this.getApplicationByUser(this.user_id)
    this.getCompanies()
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

  getApplicationByUser(id: any) {
    this.applicationService.getApplicationsByUserId(id).subscribe(
      (res: any) => {
        console.log(res.applications)
        for (var i = 0; i < res.applications.length; i++) {
          this.applications[i] = res.applications[i]
          this.jobService.getJobById(this.applications[i].job_id).subscribe(
            (res:any)=>{
              this.jobs.push(res.result)
              
              }
          )
        }

        this.Applications_found = this.applications.length

        console.log(this.jobs)
        console.log(this.applications)
      }
    )
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
