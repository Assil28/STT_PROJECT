import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Voyage } from '../model/voyage.model';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {
  baseUrl = 'http://localhost:3800';

  constructor(private http : HttpClient) { }

  getVoyage =():Observable<Voyage[]>=>{
    return this.http.get<Voyage[]>(`${this.baseUrl}/api/voyages`, )
  }

  createVoyage=(Voyage : Object) : Observable<Voyage>=>{
    const options = {
      headers: new HttpHeaders(
        { 'content-type': 'application/json'}
        )
    };

    return(this.http.post<Voyage>(
      `${this.baseUrl}/api/voyages`,
      Voyage,
      options));
  }

  getVoyageById = (id : any) : Observable<Voyage>=> {
    return this.http.get<Voyage>(`${this.baseUrl}/api/voyages/getVoyage/${id}`)
  }

  editVoyage = (idVoyage: any, voyage: any): Observable<Voyage> => {
    const options = {
        headers: new HttpHeaders({ 'content-type': 'application/json' })
    };

    // Récupérer l'ID du bus à partir de voyageForm.value.bus_id
    const busId = voyage.bus_id;

    // Créer un objet body pour la requête HTTP en incluant l'ID du bus
    const body = {
        heure_depart_voyage: voyage.heure_depart_voyage,
        heure_arrive_voyage: voyage.heure_arrive_voyage,
        date: voyage.date,
        ville_depart: voyage.ville_depart,
        ville_arrive: voyage.ville_arrive,
        prix: voyage.prix,
        // Utiliser l'ID du bus au lieu d'un objet pour bus_id
        bus_id: busId
    };

    return this.http.put<Voyage>(`${this.baseUrl}/api/voyages/${idVoyage}`, body, options);
}


  deleteVoyage = (id : number) : Observable<Object> =>{
    return this.http.delete(`${this.baseUrl}/api/voyages/deleteVoyage/${id}`)
  }

}
