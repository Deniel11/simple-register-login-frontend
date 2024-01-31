import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['../auth.component.css']
})
export class VerifyEmailComponent {

  errorMessage : String | undefined;

  constructor(private route: ActivatedRoute, private userService : UserService) {
    this.verifyEmail();
  }

  verifyEmail() {
    let emailToken;
    this.route.queryParams.subscribe(params => {
      emailToken = params['token'];
    });
    if(emailToken) {
      this.userService.verifyEmail(emailToken).subscribe(data => {
        if(data.type == 'error') {
          this.errorMessage = 'Something went wrong!';  
        } else {
          this.errorMessage = data.message;
        }
      });
    } else {
      window.location.href = '/';
    }
  }
}
