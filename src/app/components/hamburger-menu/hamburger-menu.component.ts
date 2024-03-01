import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent {
  isMenuOpen = false;
  isMobileView = false;

  constructor(private authService : AuthService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  checkScreenSize(): void {
    this.isMobileView = window.innerWidth <= 1000; // Adjust the breakpoint as needed
    this.isMenuOpen = !this.isMobileView; // Open the menu by default on larger screens
  }

  logout() {    
    this.authService.removeToken();
    window.location.href='/login';
  }
}
