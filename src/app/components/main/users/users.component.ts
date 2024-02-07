import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: any;

  errorMessage : String | undefined;

  constructor(private apiService : ApiService, private authService : AuthService) {
   this.getUsers(); 
  }

  getUsers() {
    let token = this.authService.getToken();
    if(token != null) {
      this.apiService.getUsers(token).subscribe(data => {
        if(data.status == 'error') {
          this.errorMessage = data.message;
        } else if(data.type == 'error' || data.error != null) {
          this.errorMessage = 'Something went wrong!';  
        } else {        
          this.users = data.users;
        }
      });
    }
  }
}
