import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  user! : any;

  form!: FormGroup;

  errorMessage : String | undefined;

  constructor(private apiService : ApiService, private fb:FormBuilder, private route : ActivatedRoute, private authService : AuthService) {
    let id = route.snapshot.paramMap.get('id');
    if(id != null) {
      this.getOtherUser(id);
    }
    this.form = this.fb.group({
      username: [null,
        [
          Validators.required,
          Validators.minLength(4)
        ]],
      email: [null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.email
        ]
      ],
      dateOfBirth: [null, 
        [
          Validators.required
        ]
      ],
      admin: [],
      verified: [],
      enabled: []
    });
  }

  getOtherUser(id : String) {
    let token = this.authService.getToken();
    if(token != null) {
      this.apiService.getOtherUser(token, id).subscribe(data => {
        if(data.status == 'error') {
          this.errorMessage = data.message;
        } else if(data.type == 'error' || data.error != null) {
          this.errorMessage = 'Something went wrong!';  
        } else {        
          data.dateOfBirth = new Date(data.dateOfBirth);
          this.user = data;
          this.form.controls['username'].setValue(data.username);
          this.form.controls['email'].setValue(data.email);
          this.form.controls['dateOfBirth'].setValue(data.dateOfBirth);
          this.form.controls['admin'].setValue(data.admin);
          this.form.controls['verified'].setValue(data.verified);
          this.form.controls['enabled'].setValue(data.enabled);
        }
      });
    }
  }

  editUser() {
    let token = this.authService.getToken();
    let editUser : any = {
      username: undefined,
      email: undefined,
      dateOfBirth: undefined,
      admin: undefined,
      verified: undefined,
      enabled: undefined
    };
    if(this.user.username != this.form.value.username) {
        editUser.username = this.form.value.username;
    }
    if(this.user.email != this.form.value.email) {
      editUser.email = this.form.value.email;
    }
    if(this.user.dateOfBirth != this.form.value.dateOfBirth && this.form.value.dateOfBirth != null) {
      editUser.dateOfBirth = formatDate(this.form.value.dateOfBirth, 'dd-MM-yyyy', 'en');
    }
    if(this.user.admin != this.form.value.admin) {      
      editUser.admin = this.form.value.admin;
    }
    if(this.user.verified != this.form.value.verified) {
      editUser.verified = this.form.value.verified;
    }
    if(this.user.enabled != this.form.value.enabled) {
      editUser.enabled = this.form.value.enabled;
    }

    for(let p in editUser) {
      if(editUser[p] === undefined || editUser[p] === null) {
        delete editUser[p];
      }
    }
    
    if(token != null) {
      this.apiService.editUser(token, this.user.id, editUser).subscribe(data => {
        if(data.status == 'error') {
          this.errorMessage = data.message;
        } else if(data.type == 'error') {
          this.errorMessage = 'Something went wrong!';  
        } else {
          this.errorMessage = 'Success!';
        }
      });
    }
  }

  get username () {
    return this.form.get('username');
  }

  get email () {
    return this.form.get('email');
  }

  get dateOfBirth () {
    return this.form.get('dateOfBirth');
  }
}
