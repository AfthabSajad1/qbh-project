import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-download-pdf',
  standalone: true,
  imports: [],
  templateUrl: './download-pdf.component.html',
  styleUrl: './download-pdf.component.scss'
})
export class DownloadPDFComponent {

  constructor(private apiService: ApiService){}

  downloadPdf(){

    this.apiService.generatePdf().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });

  }
}
