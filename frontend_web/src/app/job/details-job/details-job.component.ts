import { Component, OnInit } from '@angular/core';
import { JobService } from '../service/job.service';
import { Job } from '../model/job';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/company/model/company';
import { CompanyService } from 'src/app/company/service/company.service';
import { ApplicationService } from 'src/app/application/service/application.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/user/service/user.service';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-details-job',
  templateUrl: './details-job.component.html',
  styleUrls: ['./details-job.component.css']
})
export class DetailsJobComponent implements OnInit {
  authenticated = false
  job?: Job;
  company?: Company;
  job_id: any;
  user_id: any;
  deja_apply: boolean = false;

  constructor(
    private applicationService: ApplicationService,
    private jobService: JobService,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log(this.authenticated)
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth
        console.log(this.authenticated)

      }
    )

    this.user_id = localStorage.getItem('user_id');
    this.job_id = this.activatedRoute.snapshot.params['id'];

    this.activatedRoute.params.subscribe(params => {
      this.jobService.getJobById(params['id']).subscribe(
        (res: any) => {
          this.job = res.result;
          this.job_id = params['id'];
          this.companyService.getCompanyById(this.job?.society_id).subscribe(
            (res: any) => {
              this.company = res.result;
            }
          );
        },
        err => {
          console.error(err);
        }
      );
    });

    this.doesApplicationExist();
    
  }

  apply(job_id: any): void {
    const application = {
      user_id: this.user_id,
      job_id: job_id
    };

    this.applicationService.createApplication(application).subscribe(
      (res: any) => {
        this.openAlert();
        this.doesApplicationExist(); // Update deja_apply after applying
      }
    );
  }

  openAlert(): void {
    Swal.fire({
      title: 'Done',
      text: 'Your application passed successfully',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('L\'utilisateur a cliqué sur OK');
      }
    });
  }

  doesApplicationExist(): void {
    console.log('user_id= ' + this.user_id);
    console.log('job_id= ' + this.job_id);
    this.applicationService.doesApplicationExist(this.user_id, this.job_id).subscribe(
      (res: any) => {
        
        this.deja_apply = res.exists;
        
      }
    );
}


}
