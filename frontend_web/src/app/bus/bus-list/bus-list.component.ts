import { Component } from '@angular/core';
import { Bus } from '../model/bus.model';
import { BusService } from '../service/bus.service';
import { MatDialog } from '@angular/material/dialog';
import { BusEditComponent } from '../bus-edit/bus-edit.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent {
  
  bus:Bus [] = [];
  
  bus_found?:Number
  currentPage = 1;
  busPerPage = 5;
  showAddCBusModal = false;

  constructor(private BusService:BusService,public dialog: MatDialog) {}

 ngOnInit(): void {
  this.getBusList()


}
getBusList():any{
   
  this.BusService.getBuss().subscribe(
    (res:any)=>{
      this.bus=res.result
      console.log(res.result)
      this.bus_found=this.bus.length

    }
  )

}
getCurrentPageBus(): any[] {
  const startIndex = (this.currentPage - 1) * this.busPerPage;
  const endIndex = startIndex + this.busPerPage;
  return this.bus.slice(startIndex, endIndex);
}

// Fonction pour changer de page
changePage(pageNumber: number): void {
  this.currentPage = pageNumber;
}
getPageNumbers(): number[] {
  const pageCount = Math.ceil(this.bus.length / this.busPerPage);
  return Array.from({ length: pageCount }, (_, index) => index + 1);
}
openAddBusModal() {
  this.showAddCBusModal = true;
  
}

closeAddBusModal(event: boolean) {
  this.showAddCBusModal = event;
}
openEditBusDialog(idbus:any): void {
  console.log("t7alet")
  const dialogRef = this.dialog.open(BusEditComponent, {
    width: '600px', // Adjust width as needed
    data: { idbus: idbus }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

openAddBusDialog(): void {
  console.log("t7alet")
  const dialogRef = this.dialog.open(BusEditComponent, {
    width: '600px', // Adjust width as needed
  
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

openAlert(idbus: any): void {
  Swal.fire({
    title: 'Suppression ',
    text: 'Voulez-vous vraiment supprimer ce bus ?',
    icon: 'warning',
    showCancelButton: true, // Affiche le bouton Annuler
    confirmButtonText: 'Oui', // Bouton pour confirmer
    cancelButtonText: 'Annuler', // Bouton pour annuler
  }).then((result) => {
    if (result.isConfirmed) {
      this.BusService.deleteBus(idbus).subscribe(
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
  });
}


}
