import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['../auth.component.css']
})
export class VerifyEmailComponent {

  errorMessage : String | undefined;

  constructor(private route: ActivatedRoute, private apiService : ApiService) {
    this.verifyEmail();
  }

  verifyEmail() {
    let emailToken;
    this.route.queryParams.subscribe(params => {
      emailToken = params['token'];
    });
    if(emailToken) {
      this.apiService.verifyEmail(emailToken).subscribe(data => {
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
