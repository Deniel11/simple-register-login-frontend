import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form:FormGroup;

  errorMessage : String | undefined;

  constructor(private fb:FormBuilder, private authService: AuthService, private userService: UserService) {

    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    const auth = this.form.value;

    this.userService.login(auth.username, auth.password).subscribe(data => {
      if(data.status == 'error') {
        this.errorMessage = data.message;
      } else if(data.type == 'error') {
        this.errorMessage = 'Something went wrong!';  
      } else {
        this.authService.setToken(data.token);
        this.errorMessage = 'Success!';
        window.location.href = '/';
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
