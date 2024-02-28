import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateComponent } from '../translate/translate.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  
  constructor(private authService : AuthService) {}

  logout() {    
    this.authService.removeToken();
    window.location.href='/login';
  }
}
