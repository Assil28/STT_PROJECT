import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VoyageService } from '../service/voyage.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BusService } from 'src/app/bus/service/bus.service';
import { Bus } from 'src/app/bus/model/bus.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-voyage-add',
  templateUrl: './voyage-add.component.html',
  styleUrls: ['./voyage-add.component.css'],
  providers: [DatePipe],

})
export class VoyageAddComponent implements OnInit {

  @Output() dialogClosed: EventEmitter<void> = new EventEmitter<void>();

  cities: string[] = ['Tunis','Bizerte', 'Sousse', 'Sfax','Beja','Gabes','Gafsa','Jendouba','Kairaouan','Kebili','Le Kef','Mahdia','Monastrir','Nabeul','Tataouine','Touzeur','Zagouan', 'Kasserine', 'Djerba', 'Zarzis','Ben Gerden','Medenine'];

  constructor(private datePipe:DatePipe,private router:Router,private formBuilder: FormBuilder, private voyageService: VoyageService,public dialogRef: MatDialogRef<VoyageAddComponent>,private busService:BusService) {}

  form = this.formBuilder.group({
    bus_id: ['', Validators.required],
    heure_depart_voyage: ['', Validators.required],
    heure_arrive_voyage: ['', Validators.required],
    date: ['', Validators.required],
    nbr_places_reserve: [ Validators.required],
    ville_depart: ['', Validators.required],
    ville_arrive: ['', Validators.required],
    prix: ['', Validators.required]
  })

  bus:Bus[]=[];

  ngOnInit(): void {
    this.getBusList()
  }

  addVoyage() {
    console.log("aaa")
    console.log(this.form.value)
    //const formattedBirthday = birthdayValue ? this.datePipe.transform(birthdayValue, 'yyyy-MM-dd') : null;
    if (this.form.valid) {
      console.log("validation formt3adet  ")
    /*   if (formattedBirthday !== null) {
        busData.append('birthday', formattedBirthday);
      } */
      this.voyageService.createVoyage(this.form.value).subscribe(
        res => {
          console.log(res);
          this.close();
        },
        (error: Error) => {
          console.log(error);
        }
      );
    }
  }

  getBusList(){
    this.busService.getBuss().subscribe(
      (res:any)=>{
        this.bus=res.result
        this.bus = this.bus.filter(bus => bus.est_disponible === true);
        console.log(this.bus)
      }
    )
  }

  close(): void {
    this.dialogRef.close();
    this.dialogClosed.emit(); // Emit event when dialog is closed
  }
}
