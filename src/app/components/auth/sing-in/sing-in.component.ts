import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['../login.component.css']
})
export class SingInComponent {
  form:FormGroup;

  errorMessage : String | undefined;

  hide = true;

  constructor(private fb:FormBuilder, private authService: AuthService, private userService: UserService) {

    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    this.userService.login(this.form.value.username, this.form.value.password).subscribe(data => {     
      if(data.status == 'error') {
        this.errorMessage = data.message;
      } else if(data.type == 'error') {
        this.errorMessage = 'Something went wrong!';  
      } else {
        this.authService.setToken(data.token);
        window.location.href = '/'
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
