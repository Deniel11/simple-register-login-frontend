import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: any;

  errorMessage : String | undefined;

  constructor(private userService : UserService, private authService : AuthService) {
   this.getUsers(); 
  }

  getUsers() {
    let token = this.authService.getToken();
    if(token != null) {
      this.userService.getUsers(token).subscribe(data => {
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
