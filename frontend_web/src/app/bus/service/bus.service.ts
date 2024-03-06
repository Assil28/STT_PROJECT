import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../model/bus.model';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  baseUrl = 'http://localhost:3800';


  constructor(private http : HttpClient) { }

  getBuss =():Observable<Bus[]>=>{
    return this.http.get<Bus[]>(`${this.baseUrl}/api/bus`, )
  }

  createBus=(Bus : Object) : Observable<Bus>=>{
    const options = {
      headers: new HttpHeaders(
        { 'content-type': 'application/json'}
        )
    };
   
    return(this.http.post<Bus>(
      `${this.baseUrl}/api/bus`,
      Bus,
      options));
  }

  getBusById = (id : any) : Observable<Bus>=> {
    return this.http.get<Bus>(`${this.baseUrl}/api/bus/getBus/${id}`)
  }

  editBus = (idbus:any,bus : any) : Observable<Bus>=>{
    console.log("tt"+bus.value)
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json'})
    };
    const body = {
      numBus : bus.numBus,
      type : bus.type,
      nbr_places : bus.nbr_places,
      est_disponible : bus.est_disponible,
    }
   

    return(this.http.put<Bus>(`${this.baseUrl}/api/bus/${idbus}`, body, options));

  }

  deleteBus = (id : number) : Observable<Object> =>{
    return this.http.delete(`${this.baseUrl}/api/bus/deleteBus/${id}`)
  }
}
