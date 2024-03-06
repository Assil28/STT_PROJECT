import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../service/company.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent {

  private cloudinaryBaseUrl = 'https://res.cloudinary.com/dmclcaftz/image/upload/';
  private uploadPreset = 'ml_default'; // Replace with your actual upload preset

  constructor(private router:Router,private formBuilder: FormBuilder,private http : HttpClient,public dialogRef: MatDialogRef<CompanyAddComponent>,private service : CompanyService,
    ) {this.companyForm = this.formBuilder.group({
       company_name: '',
       secteur: '',
       description: '',
       website: '',
       email: '',
       location: '',
       logo: ''
     });
    // Initialize Cloudinary with your Cloudinary credentials
   }
  
   @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
   showModal = true;
   selectedFile: File | null=null ;
   companyForm: FormGroup;
   uploading = false;


 
  close(): void {
    this.dialogRef.close();
  }
  

onFileSelected(event: any): void {
   this.selectedFile = event.target.files[0];
   console.log ("--------",this.selectedFile);
}

async submitForm(): Promise<void> {
  try {
    this.uploading = true;
    // Upload the image to Cloudinary
    const imageUrl = this.selectedFile ? await this.uploadImageToCloudinary(this.selectedFile) : '';
console.log(this.selectedFile);
    // Add the company with the Cloudinary URL
    const companyData = new FormData();
    companyData.append('company_name', this.companyForm.get('company_name')!.value);
    companyData.append('secteur', this.companyForm.get('secteur')!.value);
    companyData.append('description', this.companyForm.get('description')!.value);
    companyData.append('website', this.companyForm.get('website')!.value);
    companyData.append('email', this.companyForm.get('email')!.value);
    companyData.append('location', this.companyForm.get('location')!.value);
    companyData.append('logo', imageUrl); // Use the Cloudinary URL
    
    this.service.addCompany(companyData).subscribe(
      (response) => {
        console.log('Company added successfully:', response);
        // Handle success, e.g., navigate to a success page
      },
      (error) => {
        console.error('Failed to add company:', error);
      }
    );
  } catch (error) {
    console.error('Error during form submission:', error);
  } finally {
    this.uploading = false;
  }
}

private async uploadImageToCloudinary(file: File): Promise<string> {
  const data = new FormData();
  data.append('logo', file);
  data.append('upload_preset', this.uploadPreset);
data.append('API_KEY', '724352955229851')
console.log (file);
console.log ("*****************"+data);
const headers = new HttpHeaders({
  'Authorization': '5roJ9umqhsxvCjiNO0Qx9uRAeu0', 
   //'Content-Type': 'multipart/form-data', // You may try with or without this header
});

const options = { headers };
  try {
    const response: any = await this.http.post(this.cloudinaryBaseUrl, data,options).toPromise();
    console.log('Cloudinary URL:', response.secure_url);
    return response.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Image upload to Cloudinary failed');
  }
}



}
