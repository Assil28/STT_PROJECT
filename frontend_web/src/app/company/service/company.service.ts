import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseUrl = 'http://localhost:3800';

  constructor(private http : HttpClient) { }

  getCompanyById = (id : any) : Observable<Company>=> {
    return this.http.get<Company>(`${this.baseUrl}/api/companys/getCompany/${id}`)
  }

  getCompanies = () : Observable<Company[]>=> {
    return this.http.get<Company[]>(`${this.baseUrl}/api/companys/`)
  }

  addCompany(companyData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/companys/`, companyData)
    
  }
}
