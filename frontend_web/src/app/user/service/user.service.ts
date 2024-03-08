import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3800';

  constructor(private http : HttpClient) { }


  getUsers =():Observable<User[]>=>{
    return this.http.get<User[]>(`${this.baseUrl}/api/users/`, )
  }

  createUser=(User : Object) : Observable<User>=>{
    const options = {
      headers: new HttpHeaders(
        { 'content-type': 'application/json'}
        )
    };
    return(this.http.post<User>(
      `${this.baseUrl}/api/users/`,
      User,
      options));
  }

  getUserById = (id : any) : Observable<User>=> {
    return this.http.get<User>(`${this.baseUrl}/api/users/getUser/${id}`)
  }


  editUser = (user : User) : Observable<User>=>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true, // Include credentials in the request
    };
    const body = {
      userName : user.userName,
      email : user.email,
      matricule : user.matricule,
      cin : user.cin,
      birthday : user.birthday,
      phone_number : user.phone_number,
       role:user.role,
      password: user.password,
    }
    console.log(body)

    return(this.http.put<User>(`${this.baseUrl}/api/users/${user.id}`, body, options));

  }

  deleteController = (id : number) : Observable<Object> =>{
    return this.http.delete(`${this.baseUrl}/api/users/deleteUser/${id}`)
  }


  login = (user: Object): Observable<any> => {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true, // Include credentials in the request
    };
  
    return this.http.post(
      `${this.baseUrl}/api/users/login`,
      user,
      options
    );
  };
  

  userLogin(): Observable<User> {
    
    return this.http.post<any>(`${this.baseUrl}/api/users/UserLogin`,'',{withCredentials:true});
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/users/logout`,'',{withCredentials:true});
  }


  
}
