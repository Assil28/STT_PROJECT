import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BusService } from '../service/bus.service';

@Component({
  selector: 'app-bus-edit',
  templateUrl: './bus-edit.component.html',
  styleUrls: ['./bus-edit.component.css']
})
export class BusEditComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private router:Router,private formBuilder: FormBuilder,private http : HttpClient,public dialogRef: MatDialogRef<BusEditComponent>,private service : BusService,
    ) {this.busForm = this.formBuilder.group({
      numBus: '',
      type: '',
      nbr_places: '',
      
     });
    // Initialize Cloudinary with your Cloudinary credentials
   }


  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
   showModal = true;
   busForm: FormGroup;

   ngOnInit(): void {
    console.log('Data passed to dialog:', this.data.idbus);
    // You can use this.data to access the passed data
  }

   close(): void {
    this.dialogRef.close();
  }

  
async submitForm(): Promise<void> {
  try {
   
    
    const busData = new FormData();
    busData.append('numBus', this.busForm.get('numBus')!.value);
    busData.append('type', this.busForm.get('type')!.value);
    busData.append('nbr_places', this.busForm.get('nbr_places')!.value);
    
    console.log(this.busForm.value)
    this.service.editBus(this.data.idbus,this.busForm.value).subscribe(
      (response) => {
        console.log('bus edit successfully:', response);
        // Handle success, e.g., navigate to a success page
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
