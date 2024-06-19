import { Component, ViewChild } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { TableComponent, UserDetailsModel } from '../table/table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FormComponent, TableComponent, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  showForm: boolean = true;
  showTable: boolean = false;
  editUserDetails: UserDetailsModel;
  hideForm(){
    this.showForm = !this.showForm;
    this.showTable = !this.showTable;
  }
  editDetails(details: UserDetailsModel){
    this.hideForm();
    this.editUserDetails = details;
  }
}
