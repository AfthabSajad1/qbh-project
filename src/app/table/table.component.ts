import {Component, EventEmitter, Output} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ApiService } from '../api.service';
import { GeneratePDFComponent } from '../generate-pdf/generate-pdf.component';
import { DownloadPDFComponent } from '../download-pdf/download-pdf.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, GeneratePDFComponent, DownloadPDFComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'actions'];
  dataSource = new MatTableDataSource<UserDetailsModel>();

  @Output() editUserDetails = new EventEmitter<UserDetailsModel>();
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getUsers();
  }
  
  getUsers(){    
    this.apiService.getUsers().subscribe((data: any)=>{
      this.dataSource = data;
    })
  }

  editDetails(details: UserDetailsModel){
    this.editUserDetails.emit(details);
  }

  deleteUser(details: UserDetailsModel){
    this.apiService.deleteUser(details.id).subscribe((result: any)=>{
      console.log(result); 
      this.getUsers();
    })
  }
}

export interface UserDetailsModel {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}
