import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.css']
})
export class OtherUserComponent {

  user : any;

  errorMessage : String | undefined;

  constructor(private route : ActivatedRoute, private userService : UserService, private authService : AuthService) {
    let id = route.snapshot.paramMap.get('id');
    if(id != null) {
      this.getOtherUser(id);
    }
  }

  getOtherUser(id : String) {
    let token = this.authService.getToken();
    if(token != null) {
      this.userService.getOtherUser(token, id).subscribe(data => {
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
