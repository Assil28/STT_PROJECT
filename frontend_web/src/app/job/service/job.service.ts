import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../model/job';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  baseUrl = 'http://localhost:3800';

  constructor(private http : HttpClient) { }

  getJobs =():Observable<Job[]>=>{
    return this.http.get<Job[]>(`${this.baseUrl}/api/jobs/`, )
  }


  createJob=(Job : Object) : Observable<Job>=>{
    const options = {
      headers: new HttpHeaders(
        { 'content-type': 'application/json'}
        )
    };
    //const body = JSON.stringify(book)
    return(this.http.post<Job>(
      `${this.baseUrl}/api/jobs/`,
      Job,
      options));
  }

  getJobById = (id : any) : Observable<Job>=> {
    return this.http.get<Job>(`${this.baseUrl}/api/jobs/getJob/${id}`)
  }

  editJob = (job : Job) : Observable<Job>=>{
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json'})
    };
    const body = {
      job_name : job.job_name,
      category : job.category,
      job_description : job.job_description,
      skills : job.skills,
      Experiences_Education : job.Experiences_Education,
      Location : job.Location,
      job_type : job.job_type,
      salaire: job.salaire,
      application_date: job.application_date,
      vacancy: job.vacancy,
    }

    return(this.http.put<Job>(`${this.baseUrl}/api/jobs/${job._id}`, body, options));

  }

  deleteJob = (id : number) : Observable<Object> =>{
    return this.http.delete(`${this.baseUrl}/api/jobs/deleteJob/${id}`)
  }

  getJobByUserId = (id : any) : Observable<Job[]>=> {
    return this.http.get<Job[]>(`${this.baseUrl}/api/jobs/jobByUser/${id}`)
  }

}
