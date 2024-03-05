import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.css']
})
export class OtherUserComponent {

  user : any;

  errorMessage : String | undefined;

  constructor(private route : ActivatedRoute, private apiService : ApiService, private authService : AuthService) {
    let id = route.snapshot.paramMap.get('id');
    if(id != null) {
      this.getOtherUser(id);
    }
  }

  getOtherUser(id : String) {
    let token = this.authService.getToken();
    if(token != null) {
      this.apiService.getOtherUser(token, id).subscribe(data => {
        if(data.status == 'error') {
          if(data.message == "Access Denied.") {
            this.authService.removeToken();
            window.location.href = "/";
          }
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
