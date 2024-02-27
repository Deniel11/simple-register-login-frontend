import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.css']
})
export class RegisterComponent {
  
  form!: FormGroup;

  errorMessage : String | undefined;

  hide = true;

  constructor(private fb:FormBuilder, private apiService: ApiService, private translate : TranslateService) {
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
    this.apiService.register(this.form.value).subscribe(data => {
      console.log(data);

      if(data.error.status == 'error') {
        if(data.status == 409){
          let spliterErrorMessage = data.error.message.split(" ", 1)[0];
          let parameter : String = '';
          if(spliterErrorMessage == 'Username'){
            parameter = this.translate.instant('username');
          } else if(spliterErrorMessage == 'Email') {
            parameter = this.translate.instant('emailAddress');
          }
          
          this.errorMessage = parameter + ' ' + this.translate.instant('isTaken');
        } else if(data.status == 406) {
          if(data.error.message.includes('email')){
            this.errorMessage = this.translate.instant('emailAddressError');
          } else if(data.error.message.includes('date')) {
            this.errorMessage = this.translate.instant('dateOfBirthError');
          } else if(data.error.message.includes('Password')) {
            this.errorMessage = this.translate.instant('passwordError');
          }
        } else {
          this.errorMessage = this.translate.instant('sgWentWrong');
          console.log(data.error.message);
        }
      } else if(data.type == 'error' || data.status == 0) {
        this.errorMessage = this.translate.instant('sgWentWrong');  
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
