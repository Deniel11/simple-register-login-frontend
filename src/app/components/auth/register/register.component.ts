import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.component.css']
})
export class RegisterComponent {
  
  form!: FormGroup;

  errorMessage : String | undefined;

  hide = true;

  constructor(private fb:FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      username: ['',
        [
          Validators.required,
          Validators.minLength(4)
        ]],
      email: ['',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.email
        ]
      ],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')
      ]],
      dateOfBirth: [null, 
        [
          Validators.required
        ]] 
    });
  }

  register() : void{
    if (this.form.value.dateOfBirth != null) {
      this.form.value.dateOfBirth = formatDate(this.form.value.dateOfBirth, 'dd-MM-yyyy', 'en');
    }
    this.userService.register(this.form.value).subscribe(data => {
      if(data.status == 'error') {
        this.errorMessage = data.message;
      } else if(data.type == 'error') {
        this.errorMessage = 'Something went wrong!';  
      } else {
        window.location.href = '/';
      }
    });
  }

  get username () {
    return this.form.get('username');
  }

  get email () {
    return this.form.get('email');
  }

  get password () {
      return this.form.get('password');
  }

  get dateOfBirth () {
    return this.form.get('dateOfBirth');
  }
}
