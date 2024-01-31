import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../login.component.css']
})
export class ChangePasswordComponent {

  form : FormGroup;

  errorMessage : String | undefined;

  hideOld = true;

  hideNew = true;

  constructor(private userService : UserService, private fb : FormBuilder, private route: ActivatedRoute) {
    this.form = this.fb.group({
      oldPassword: ['', [
        Validators.required
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')
      ]]
    });
  }

  changePassword() {
    let forgotPasswordToken;
    this.route.queryParams.subscribe(params => {
      forgotPasswordToken = params['token'];
    });
    if(forgotPasswordToken) {
      this.userService.changePassword(forgotPasswordToken, this.form.value).subscribe(data => {
        if(data.status == 'error') {
          this.errorMessage = data.message;
        } else if(data.type == 'error') {
          this.errorMessage = 'Something went wrong!';  
        } else {
          this.errorMessage = 'Success, go back to login!';
        }
      });
    } else {
      window.location.href = '/';
    }
  }

  get newPassword() {
    return this.form.get("newPassword");
  }

  get oldPassword() {
    return this.form.get("oldPassword");
  }
}
