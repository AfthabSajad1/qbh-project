import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-generate-pdf',
  standalone: true,
  imports: [],
  templateUrl: './generate-pdf.component.html',
  styleUrl: './generate-pdf.component.scss'
})
export class GeneratePDFComponent {

  constructor(private apiService: ApiService){}

  generatePdf(){
    this.apiService.generatePdf().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
