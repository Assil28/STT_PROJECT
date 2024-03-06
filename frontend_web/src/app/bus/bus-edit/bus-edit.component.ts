import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BusService } from '../service/bus.service';
import { Bus } from '../model/bus.model';

@Component({
  selector: 'app-bus-edit',
  templateUrl: './bus-edit.component.html',
  styleUrls: ['./bus-edit.component.css']
})
export class BusEditComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private formBuilder: FormBuilder, private http: HttpClient, public dialogRef: MatDialogRef<BusEditComponent>, private service: BusService,
  ) {
    this.busForm = this.formBuilder.group({
      numBus: data.busForEdit.numBus,
      type: data.busForEdit.type,
      nbr_places: data.busForEdit.nbr_places,
      est_disponible:data.busForEdit.est_disponible

    });
    // Initialize Cloudinary with your Cloudinary credentials
  }


  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  showModal = true;
  busForm: FormGroup;

  bus: Bus | undefined;

  ngOnInit(): void {
    console.log('Data passed to dialog:', this.data.busForEdit._id);

  }

  close(): void {
    this.dialogRef.close();
    this.closeModal.emit();
  }


  async submitForm(): Promise<void> {
    try {

      console.log(this.busForm.value)
      this.service.editBus(this.data.busForEdit._id, this.busForm.value).subscribe(
        (response) => {
          console.log('bus edit successfully:', response);
          this.close();
        },
        (error) => {
          console.error('Failed to edit bus:', error);
        }
      );
    } catch (error) {
      console.error('Error during form submission:', error);

    }
  }


}
