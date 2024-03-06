export class User {
    id:string;
    fullName: string;
    description: string;
    email: string;
    password: string;
    status: string;
    adresse: string;
    birthday: Date;
    skills: string;
    pdf: string; // Vous pouvez ajuster le type si nécessaire
    image: string; // Vous pouvez ajuster le type si nécessaire
  
    constructor(
        id:string,
      fullName: string,
      description: string,
      email: string,
      password: string,
      status: string,
      adresse: string,
      birthday: Date,
      skills: string,
      pdf: string,
      image: string
    ) {
        this.id = id;
      this.fullName = fullName;
      this.description = description;
      this.email = email;
      this.password = password;
      this.status = status;
      this.adresse = adresse;
      this.birthday = birthday;
      this.skills = skills;
      this.pdf = pdf;
      this.image = image;
    }
  }
  
 
