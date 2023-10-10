import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  token = this.authService.getToken();

  constructor(private authService : AuthService) {}

  logout() {    
    this.authService.removeToken();
    window.location.href='/login';
  }
}
