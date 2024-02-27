import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css']
})
export class LoginComponent {
  form:FormGroup;

  errorMessage : String | undefined;

  hide = true;

  constructor(private fb:FormBuilder, private authService: AuthService, private apiService: ApiService) {

    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    this.apiService.login(this.form.value.username, this.form.value.password).subscribe(data => {     
      if(data.status == 'error') {
        this.errorMessage = data.message;
      } else if(data.token){       
        this.authService.setToken(data.token);
        window.location.href = '/'
      } else {
        this.errorMessage = 'Something went wrong!';  
      }
    });
  }

    get username() {
      return this.form.get('username');
    }

    get password() {
      return this.form.get('password');
    }
}
