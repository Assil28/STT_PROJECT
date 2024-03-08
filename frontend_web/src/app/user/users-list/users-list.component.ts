import { Component } from '@angular/core';
import { User } from '../model/user';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UserService } from '../service/user.service';
import { UserAddComponent } from '../user-add/user-add.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  users:User [] = [];
  
  users_found?:Number
  currentPage = 1;
  userPerPage = 5;
  showAddUserModal = false;

  constructor(private userService:UserService,public dialog: MatDialog) {}

 ngOnInit(): void {
  this.getUsersList()


}
getUsersList():any{
   
  this.userService.getUsers().subscribe(
    (res:any)=>{
      this.users=res.result
      console.log(res.result)
      this.users_found=this.users.length

    }
  )


}
getCurrentPageUsers(): any[] {
  const startIndex = (this.currentPage - 1) * this.userPerPage;
  const endIndex = startIndex + this.userPerPage;
  return this.users.slice(startIndex, endIndex);
}

// Fonction pour changer de page
changePage(pageNumber: number): void {
  this.currentPage = pageNumber;
}
getPageNumbers(): number[] {
  const pageCount = Math.ceil(this.users.length / this.userPerPage);
  return Array.from({ length: pageCount }, (_, index) => index + 1);
}
openAddUserModal() {
  this.showAddUserModal = true;
  
}

closeAddUserModal(event: boolean) {
  this.showAddUserModal = event;
}
openEditUserDialog(idbus:any): void {
  console.log("t7alet")
  const dialogRef = this.dialog.open(UserAddComponent, {
    width: '600px', // Adjust width as needed
    data: { idbus: idbus }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  }); 
}

openAddUserDialog(): void {
   console.log("t7alet")
  const dialogRef = this.dialog.open(UserAddComponent, {
    width: '600px', 
  
  }); 

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
  
}

openAlert(idbus: any): void {
 /*  Swal.fire({
    title: 'Suppression ',
    text: 'Voulez-vous vraiment supprimer ce bus ?',
    icon: 'warning',
    showCancelButton: true, // Affiche le bouton Annuler
    confirmButtonText: 'Oui', // Bouton pour confirmer
    cancelButtonText: 'Annuler', // Bouton pour annuler
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.(idbus).subscribe(
        () => {
          // Mettez ici le code à exécuter après la suppression réussie
          console.log('Bus supprimé avec succès');
          // Rechargez la liste des bus après la suppression réussie si nécessaire
          this.getBusList();
        },
        (error) => {
          console.error('Échec de la suppression du bus:', error);
          // Affichez un message d'erreur ou effectuez une action appropriée en cas d'échec de la suppression
        }
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      console.log('L\'utilisateur a cliqué sur Annuler');
      // L'utilisateur a cliqué sur Annuler, rien ne se passe
    }
  }); */
}
}
