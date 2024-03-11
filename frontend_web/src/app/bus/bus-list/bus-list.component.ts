import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Bus } from '../model/bus.model';
import { BusService } from '../service/bus.service';
import { MatDialog } from '@angular/material/dialog';
import { BusEditComponent } from '../bus-edit/bus-edit.component';
import Swal from 'sweetalert2';
import { BusAddComponent } from '../bus-add/bus-add.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements AfterViewInit  {
  
  bus:Bus [] = [];
  displayedColumns = ['numBus', 'type', 'nbr_places', 'est_disponible','edit','supp'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  bus_found?:Number
  currentPage = 1;
  busPerPage = 5;
  pageEvent!: PageEvent;
  showAddCBusModal = false;
  public dataSource = new MatTableDataSource<Bus>();
    constructor(private BusService:BusService,public dialog: MatDialog) {


  }


 ngOnInit(): void {
  this.getBusList()


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

getBusList():any{
   
  this.BusService.getBuss().subscribe(
    (res:any)=>{
      this.bus=res.result.reverse()
      this.dataSource.data=this.bus;
      console.log(res.result)
      this.bus_found=this.dataSource.data.length

    }
  )


}
getCurrentPageBus(): any[] {
  const startIndex = (this.currentPage - 1) * this.busPerPage;
  const endIndex = startIndex + this.busPerPage;
  const currentPageData = this.dataSource.filteredData.slice(startIndex, endIndex);
  console.log("lenghth", this.dataSource.filteredData.length);
  return currentPageData;
}
// Fonction pour changer de page
changePage(pageNumber: number): void {
  this.currentPage = pageNumber;
  console.log("Current Page:", this.currentPage);
}
getPageNumbers(): number[] {
  const pageCount = Math.ceil(this.dataSource.data.length / this.busPerPage);
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);
  console.log("data source de data:", this.dataSource.data.length);
  return pageNumbers;
}
openAddBusModal() {
  this.showAddCBusModal = true;
  
}

closeAddBusModal(event: boolean) {
  this.showAddCBusModal = event;
}

openEditBusDialog(idbus:any): void {
  let busforEdit = this.bus.find((p)=>{
    return p._id === idbus
  })
  console.log(busforEdit)
  console.log("t7alet")
  const dialogRef = this.dialog.open(BusEditComponent, {
    width: '600px', // Adjust width as needed
    data: { busForEdit: busforEdit }
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
    this.getBusList();
  }

  openAddBusDialog(): void {
    console.log("t7alet");
    const dialogRef = this.dialog.open(BusAddComponent, {
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
