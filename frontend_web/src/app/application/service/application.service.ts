import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../model/application';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  baseUrl = 'http://localhost:3800';

  constructor(private http : HttpClient) { }

 

  createApplication=(Job : Object) : Observable<Application>=>{
    const options = {
      headers: new HttpHeaders(
        { 'content-type': 'application/json'}
        )
    };
    return(this.http.post<Application>(
      `${this.baseUrl}/api/applications/`,
      Job,
      options));
  }

  doesApplicationExist = (iduser: any,idjob:any) : Observable<boolean>=> {
    return this.http.get<boolean>(`${this.baseUrl}/api/applications/doesApplicationExist/${iduser}/${idjob}`)
  }

  getApplicationsByUserId = (iduser: any) : Observable<Application[]>=> {
    return this.http.get<Application[]>(`${this.baseUrl}/api/applications/applicationsByUser/${iduser}`)
  }
 
}
