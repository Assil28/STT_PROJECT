import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VoyageService } from '../service/voyage.service';
import { Bus } from 'src/app/bus/model/bus.model';
import { BusService } from 'src/app/bus/service/bus.service';

@Component({
  selector: 'app-voyage-edit',
  templateUrl: './voyage-edit.component.html',
  styleUrls: ['./voyage-edit.component.css']
})
export class VoyageEditComponent {


cities: string[] = ['Tunis','Bizerte', 'Sousse', 'Sfax','Beja','Gabes','Gafsa','Jendouba','Kairaouan','Kebili','Le Kef','Mahdia','Monastrir','Nabeul','Tataouine','Touzeur','Zagouan', 'Kasserine', 'Djerba', 'Zarzis','Ben Gerden','Medenine'];

bus:Bus[]=[];
busMat:any
busDeja:Bus | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private router:Router,
  private formBuilder: FormBuilder,
  private http : HttpClient,
  public dialogRef: MatDialogRef<VoyageEditComponent>,
  private service : VoyageService,
  private busService:BusService

    ) {
      // Convertissez la date de la chaîne en objet Date
      const date = new Date(data.voyageforEdit.date);

      // Formatez la date au format "AAAA-MM-JJ"
      const formattedDate = date.toISOString().split('T')[0];
      
      console.log(formattedDate);
      
      this.voyageForm = this.formBuilder.group({
      heure_depart_voyage: [data.voyageforEdit.heure_depart_voyage, [Validators.required]],
      heure_arrive_voyage: [data.voyageforEdit.heure_arrive_voyage, [Validators.required]],
      date: [formattedDate, [Validators.required]], // Utilisez la date formatée dans le formulaire
      ville_depart: [data.voyageforEdit.ville_depart, [Validators.required]],
      ville_arrive: [data.voyageforEdit.ville_arrive, [Validators.required]],
      prix: [data.voyageforEdit.prix, [Validators.required]],
      bus_id:  [[data.voyageforEdit.bus_id],[Validators.required]]
     });
      console.log(data.voyageforEdit)
   }

   @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
   showModal = true;
   voyageForm: FormGroup;

   ngOnInit(): void {
  

    console.log('Data passed to dialog:', this.data.voyageforEdit);
    this.getBusList()
    console.log(this.busMat)

  }

   close(): void {
    this.dialogRef.close();
    this.closeModal.emit();
  }


async submitForm(): Promise<void> {
  try {


    console.log(this.voyageForm.value)
    this.service.editVoyage(this.data.voyageforEdit._id,this.voyageForm.value).subscribe(
      (response) => {
        console.log('voyage edit successfully:', response);
        // Handle success, e.g., navigate to a success page
        this.close();
      },
      (error) => {
        console.error('Failed to edit voyage:', error);
      }
    );
  } catch (error) {
    console.error('Error during form submission:', error);

}
}

getBusList(){
  this.busService.getBuss().subscribe(
    (res:any)=>{
      this.bus=res.result
      this.bus = this.bus.filter(bus => bus.est_disponible === true);
      console.log(this.bus)

      this.busDeja = this.bus.find((p)=>{
        return p._id === this.data.voyageforEdit.bus_id
      })
      this.busMat=this.busDeja?.numBus
      console.log('bbb'+this.busMat)
    }
  )
}

}
