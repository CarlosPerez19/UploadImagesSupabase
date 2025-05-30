import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { supabase } from '../supabase.client';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, FormsModule],
})
export class HomePage {
  selectedFile: File | null = null;

  constructor() {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Archivo seleccionado:', file);
    }
  }

  async uploadFile() {
    if (!this.selectedFile) {
      alert('Por favor selecciona un archivo primero.');
      return;
    }

    const filePath = `${Date.now()}_${this.selectedFile.name}`; 

    try {
      const { data, error } = await supabase.storage
        .from('archivos') 
        .upload(filePath, this.selectedFile);

      if (error) {
        console.error('Error al subir archivo:', error.message);
        alert('Error al subir archivo: ' + error.message);
      } else {
        console.log('Archivo subido:', data);
        alert('Archivo subido exitosamente.');
      }
    } catch (err) {
      console.error('Error inesperado:', err);
      alert('Ocurrió un error inesperado.');
    }
  }
}
