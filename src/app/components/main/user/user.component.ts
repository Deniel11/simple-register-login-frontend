import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  
  user? : User;

  errorMessage : String | undefined;

  constructor(private apiService : ApiService, private authService : AuthService) {
   this.getUser(); 
  }

  getUser() {
    let token = this.authService.getToken();
    if(token != null) {
      this.apiService.getUser(token).subscribe(data => {
        if(data.status == 'error') {
          this.errorMessage = data.message;
        } else if(data.type == 'error' || data.error != null) {
          this.errorMessage = 'Something went wrong!';  
        } else {        
          this.user = data;
        }
      });
    }
  }
}
