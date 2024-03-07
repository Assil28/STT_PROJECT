export class User {
    id:string;
    userName: string;
   
    email: string;
    password: string;
    matricule: string;
    phone_number: string;
    birthday: Date;
    role: string;
    cin: string;
    constructor(
      id:string,
      userName: string,
     
      email: string,
      password: string,
      matricule: string,
      phone_number: string,
      birthday: Date,
      role: string,
      cin: string,
    ) {
        this.id = id;
      this.userName = userName;
      this.matricule = matricule;
      this.email = email;
      this.password = password;
      this.role = role;
      this.phone_number = phone_number;
      this.birthday = birthday;
      this.cin = cin;

    }
  }
  
 
