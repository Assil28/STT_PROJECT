import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusService } from '../service/bus.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bus-add',
  templateUrl: './bus-add.component.html',
  styleUrls: ['./bus-add.component.css']
})
export class BusAddComponent implements OnInit {
  @Output() dialogClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router:Router,private formBuilder: FormBuilder, private busService: BusService,public dialogRef: MatDialogRef<BusAddComponent>) {}

  form = this.formBuilder.group({
    numBus: ['', [Validators.required, this.validateNumBusFormat]],
    type: ['', Validators.required],
    nbr_places: ['', Validators.required],
    est_disponible: [ Validators.required],
  })

  ngOnInit(): void {}

  addBus() {
    if (this.form.valid) {
      this.busService.createBus(this.form.value).subscribe(
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

  close(): void {
    this.dialogRef.close();
    this.dialogClosed.emit(); // Emit event when dialog is closed
  }



  validateNumBusFormat(control: AbstractControl): { [key: string]: any } | null {
    const numBusValue: string = control.value;
    const valid = numBusValue.includes('Tu'); // Vérifie si la chaîne contient 'Tu'
    return valid ? null : { invalidNumBus: true };
  }
}
