import { Component } from '@angular/core';
import { Voyage } from '../model/voyage.model';
import { VoyageService } from '../service/voyage.service';
import { MatDialog } from '@angular/material/dialog';
import { VoyageEditComponent } from '../voyage-edit/voyage-edit.component';
import Swal from 'sweetalert2';
import { VoyageAddComponent } from '../voyage-add/voyage-add.component';
import { DatePipe } from '@angular/common';
import { BusService } from 'src/app/bus/service/bus.service';

@Component({
  selector: 'app-voyage-list',
  templateUrl: './voyage-list.component.html',
  styleUrls: ['./voyage-list.component.css'],
  providers: [DatePipe],

})
export class VoyageListComponent {

  voyage: Voyage[] = [];

  voyage_found?: Number
  currentPage = 1;
  voyagePerPage = 5;
  showAddCVoyageModal = false;

  constructor(private VoyageService: VoyageService, private busService: BusService, public dialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getVoyageList()


  }
  getVoyageList(): void {
    this.VoyageService.getVoyage().subscribe(
      (res: any) => {
        this.voyage = res.result.map((v: any) => {
          if (v.date) {
            v.date = this.datePipe.transform(v.date, 'yyyy-MM-dd') || '';
          }
          // Récupérer les détails du bus pour chaque voyage
          this.busService.getBusById(v.bus_id).subscribe((busDetails: any) => {
            console.log(v)
            console.log(busDetails.result.numBus)
            v.busDetails = busDetails; // Stocker les détails du bus dans une propriété supplémentaire du voyage
          });
          return v;
        });
        this.voyage_found = this.voyage.length;
        this.voyage.reverse();
      }
    );
  }
  getCurrentPageVoyage(): any[] {
    const startIndex = (this.currentPage - 1) * this.voyagePerPage;
    const endIndex = startIndex + this.voyagePerPage;
    return this.voyage.slice(startIndex, endIndex);
  }

  // Fonction pour changer de page
  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.voyage.length / this.voyagePerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
  openAddVoyageModal() {
    this.showAddCVoyageModal = true;

  }

  closeAddVoyageModal(event: boolean) {
    this.showAddCVoyageModal = event;
  }
  openEditVoyageDialog(idvoyage: any): void {
    console.log('id voy =' + idvoyage)
    let voyageforEdit = this.voyage.find((p) => {
      return p._id === idvoyage
    })
    console.log(voyageforEdit)
    console.log("t7alet")
    const dialogRef = this.dialog.open(VoyageEditComponent, {
      width: '600px', // Adjust width as needed
      data: { voyageforEdit: voyageforEdit }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.reloadData(); // Reload data when dialog is closed
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // Method to reload data when dialog is closed
  reloadData(): void {
    this.getVoyageList();
  }

  openAddVoyageDialog(): void {
    console.log("t7alet");
    const dialogRef = this.dialog.open(VoyageAddComponent, {
      width: '600px', // Adjust width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.reloadData(); // Reload data when dialog is closed
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAlert(idvoyage: any): void {
    Swal.fire({
      title: 'Suppression ',
      text: 'Voulez-vous vraiment supprimer ce voyage ?',
      icon: 'warning',
      showCancelButton: true, // Affiche le bouton Annuler
      confirmButtonText: 'Oui', // Bouton pour confirmer
      cancelButtonText: 'Annuler', // Bouton pour annuler
    }).then((result) => {
      if (result.isConfirmed) {
        this.VoyageService.deleteVoyage(idvoyage).subscribe(
          () => {
            // Mettez ici le code à exécuter après la suppression réussie
            console.log('Voyage supprimé avec succès');
            // Rechargez la liste des bus après la suppression réussie si nécessaire
            this.getVoyageList();
          },
          (error) => {
            console.error('Échec de la suppression du voyage:', error);
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
