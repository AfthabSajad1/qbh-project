import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ApiService } from '../api.service';
import { UserDetailsModel } from '../table/table.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnChanges{
  userForm: FormGroup;
  @Output() hideForm = new EventEmitter<void>();
  @Input() editUserDetails: UserDetailsModel;
  constructor(private fb: FormBuilder,
    private apiService: ApiService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      address: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['editUserDetails']){
      this.fillForm(this.editUserDetails);
    }  
  }

  onSubmit() {
    if (this.userForm.valid) {
      if(!this.editUserDetails?.id){
        this.addUser();
      } else {
        this.editUser();
      }
    }
  }

  fillForm(details: UserDetailsModel){
    this.userForm.patchValue(details);
  }

  addUser(){
    this.apiService.postUser(this.userForm.value).subscribe(result =>{
      console.log(result);
      this.hideForm.emit();
    })
  }

  editUser(){
    this.apiService.editUser(this.editUserDetails.id, this.userForm.value).subscribe(result=>{
      console.log(result);
      this.hideForm.emit();
    })
  }
}
