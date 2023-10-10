import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { RegisterUser } from '../../models/registerUser.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  errorMessage : String | undefined;

  constructor(private fb:FormBuilder, private userService: UserService) {

  }

  ngOnInit(): void {
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
    
    const registerUser : RegisterUser = this.form.value;
    this.userService.register(registerUser).subscribe(data => {
      if(data.status == 'error') {
        this.errorMessage = data.message;
      } else if(data.type == 'error') {
        this.errorMessage = 'Something went wrong!';  
      } else {
        this.errorMessage = 'Success!';
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
