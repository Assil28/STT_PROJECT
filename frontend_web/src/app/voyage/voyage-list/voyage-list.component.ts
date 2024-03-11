import { Component, ViewChild } from '@angular/core';
import { Voyage } from '../model/voyage.model';
import { VoyageService } from '../service/voyage.service';
import { MatDialog } from '@angular/material/dialog';
import { VoyageEditComponent } from '../voyage-edit/voyage-edit.component';
import Swal from 'sweetalert2';
import { VoyageAddComponent } from '../voyage-add/voyage-add.component';
import { DatePipe } from '@angular/common';
import { BusService } from 'src/app/bus/service/bus.service';
import { VoyageAddParMoisComponent } from '../voyage-add-par-mois/voyage-add-par-mois.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Bus } from 'src/app/bus/model/bus.model';

@Component({
  selector: 'app-voyage-list',
  templateUrl: './voyage-list.component.html',
  styleUrls: ['./voyage-list.component.css'],
  providers: [DatePipe],

})
export class VoyageListComponent {

  voyage: Voyage[] = [];
  displayedColumns = ['matricule', 'depart', 'arrive', 'date','places','vdep','varr','prix','edit','supp'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  voyage_found?: Number
  currentPage = 1;
  voyagePerPage = 5;
  showAddCVoyageModal = false;
  public dataSource = new MatTableDataSource<Voyage>();

  constructor(private VoyageService: VoyageService, private busService: BusService, public dialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getVoyageList()


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
  
  getVoyageList(): void {
    this.VoyageService.getVoyage().subscribe(
      (res: any) => {
        this.voyage=res.result.reverse();
        this.dataSource.data=this.voyage;
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
    const currentPageData = this.dataSource.filteredData.slice(startIndex, endIndex);
  console.log("lenghth", this.dataSource.filteredData.length);
  return currentPageData;
    return this.voyage.slice(startIndex, endIndex);
  }

  // Fonction pour changer de page
  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.dataSource.data.length / this.voyagePerPage);
    const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);
    console.log("data source de data:", this.dataSource.data.length);
    return pageNumbers;  }
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


  openAddVoyageParMoisDialog(): void {
    console.log("t7alet");
    const dialogRef = this.dialog.open(VoyageAddParMoisComponent, {
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
