import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { User } from '../model/user';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UserService } from '../service/user.service';
import { UserAddComponent } from '../user-add/user-add.component';
import { DatePipe } from '@angular/common';
import { EditControlleurComponent } from '../../controller/edit-controlleur/edit-controlleur.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [DatePipe],

})
export class UsersListComponent implements AfterViewInit{
  users:User [] = [];
  displayedColumns = ['matricule', 'username','email', 'phone_number', 'cin','birthday','edit','supp'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  users_found?:Number
  currentPage = 1;
  userPerPage = 5;
  showAddUserModal = false;
  public dataSource = new MatTableDataSource<User>();

  constructor(private userService:UserService,public dialog: MatDialog, private datePipe: DatePipe) {}

 ngOnInit(): void {
  this.getUsersList()


}
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

getUsersList():any{
   
  this.userService.getUsers().subscribe(
   (res: any) => {
    this.users=res.result.reverse();
    this.dataSource.data=this.users;
    console.log(res.result)
    
        this.users = res.result.map((user: any) => {
         
          // Format the birthday field using DatePipe
          if (user.birthday) {
            user.birthday = this.datePipe.transform(user.birthday, 'yyyy-MM-dd') || '';
          }
          return user;
        });
        this.users_found=this.dataSource.data.length
      }
      
  )


}
getCurrentPageUsers(): any[] {
  const startIndex = (this.currentPage - 1) * this.userPerPage;
  const endIndex = startIndex + this.userPerPage;
  const currentPageData = this.dataSource.filteredData.slice(startIndex, endIndex);
  console.log("lenghth", this.dataSource.filteredData.length);
  return currentPageData;
}

// Fonction pour changer de page
changePage(pageNumber: number): void {
  this.currentPage = pageNumber;
}
getPageNumbers(): number[] {
  const pageCount = Math.ceil(this.dataSource.data.length / this.userPerPage);
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);
  console.log("data source de data:", this.dataSource.data.length);
  return pageNumbers;
}
openAddUserModal() {
  this.showAddUserModal = true;
  
}

closeAddUserModal(event: boolean) {
  this.showAddUserModal = event;
}


openEditControllerDialog(idController:any): void {
  let controllerforEdit = this.users.find((p)=>{
    return p.id === idController
  })
  console.log(controllerforEdit)
  console.log("t7alet")
  const dialogRef = this.dialog.open(EditControlleurComponent, {
    width: '600px', // Adjust width as needed
    data: { controllerforEdit: controllerforEdit }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.reloadData(); // Reload data when dialog is closed
  });

dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
});
}
reloadData(): void {
  this.getUsersList();
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

openAlert(idControlleur: any): void {
  Swal.fire({
    title: 'Suppression ',
    text: 'Voulez-vous vraiment supprimer ce bus ?',
    icon: 'warning',
    showCancelButton: true, // Affiche le bouton Annuler
    confirmButtonText: 'Oui', // Bouton pour confirmer
    cancelButtonText: 'Annuler', // Bouton pour annuler
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.deleteController(idControlleur).subscribe(
        () => {
          // Mettez ici le code à exécuter après la suppression réussie
          console.log('controlleur supprimé avec succès');
          // Rechargez la liste des bus après la suppression réussie si nécessaire
          this.getUsersList();
        },
        (error) => {
          console.error('Échec de la suppression du controlleur :', error);
          // Affichez un message d'erreur ou effectuez une action appropriée en cas d'échec de la suppression
        }
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      console.log('L\'utilisateur a cliqué sur Annuler');
      // L'utilisateur a cliqué sur Annuler, rien ne se passe
    }
  }); 
}
}
