import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  //private cloudinary: Cloudinary;

  constructor() {
    // Initialize Cloudinary with your Cloudinary credentials
    /* this.cloudinary = new Cloudinary({
      cloud_name: 'dh31yt1c5',
      api_key: '892623454755429',
      api_secret: '5roJ9umqhsxvCjiNO0Qx9uRAeu0',
    }); */
  }
/*   async uploadImage(file: File): Promise<string> {
    const base64Data = await this.readFileAsBase64(file);

    // Upload the Base64 data to Cloudinary
    const uploadResult: UploadApiResponse = await v2.uploader.upload(`data:${file.type};base64,${base64Data}`, {
                resource_type: 'auto', // Automatically determine the resource type (image, video, raw)
        folder: 'your_upload_folder', // Optional: Set a folder in Cloudinary for organization
        // Additional Cloudinary upload options
      });

      // Assuming you want to return the secure URL of the uploaded image
      return uploadResult.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Image upload failed');
    } */
    /* private readFileAsBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result.split(',')[1]); // Extract the Base64 data
          } else {
            reject(new Error('Failed to read file as Base64.'));
          }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    } */
}
