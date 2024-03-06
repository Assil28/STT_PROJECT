import { Component, OnInit } from '@angular/core';
import { JobService } from '../service/job.service';
import { CompanyService } from 'src/app/company/service/company.service';
import { Job } from '../model/job';
import { Company } from 'src/app/company/model/company';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job-posted',
  templateUrl: './job-posted.component.html',
  styleUrls: ['./job-posted.component.css']
})
export class JobPostedComponent implements OnInit {


  jobs: Job[] = [];
  companys:Company[]=[];
  Jobs_found?:Number
  currentPage = 1;
  jobsPerPage = 5;
  user_id: any;
  constructor(private jobService:JobService,private companyService:CompanyService) {

  }


  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    console.log(this.user_id)
    this.getJobByUserId(this.user_id)
  }

  getJobByUserId(id:any):any{
   
    this.jobService.getJobByUserId(id).subscribe(
      (res:any)=>{
        this.jobs=res.jobs
        console.log(this.jobs)

      }
    )
  
  }

}
