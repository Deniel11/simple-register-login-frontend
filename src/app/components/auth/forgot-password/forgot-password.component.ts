import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../auth.component.css']
})
export class ForgotPasswordComponent {
  
  form : FormGroup;

  errorMessage : String | undefined;

  constructor(private apiService : ApiService, private fb : FormBuilder) {
    this.form = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.email
        ]
      ] 
    });
  }

  forgotPassword() {
    this.apiService.forgotPassword(this.form.value.email).subscribe(data => {
      if(data.status == 'error') {
        this.errorMessage = data.message;
      } else if(data.type == 'error') {
        this.errorMessage = 'Something went wrong!';  
      } else {
        this.errorMessage = 'Success, check your email!';
      }
    });
  }

  get email (){
    return this.form.get('email');
  }
}
