import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user/model/user';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  baseUrl = 'http://localhost:3800';

  constructor(private http : HttpClient) { }


  getUsers =():Observable<User[]>=>{
    return this.http.get<User[]>(`${this.baseUrl}/api/users/`, )
  }

  

  getUserById = (id : any) : Observable<User>=> {
    return this.http.get<User>(`${this.baseUrl}/api/users/getUser/${id}`)
  }



  deleteController = (id : number) : Observable<Object> =>{
    return this.http.delete(`${this.baseUrl}/api/users/deleteUser/${id}`)
  }


  editController = (idcontroller:any,controller : User) : Observable<User>=>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true, // Include credentials in the request
    };
    const body = {
      userName : controller.userName,
      email : controller.email,
      matricule : controller.matricule,
      cin : controller.cin,
      birthday : controller.birthday,
      phone_number : controller.phone_number,
      // role:user.role,
///      password: user.password,
    }
    console.log(body)

    return(this.http.put<User>(`${this.baseUrl}/api/users/${idcontroller}`, body, options));

  }

  
}
