import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../components/auth/login/login.component';
import { MainComponent } from '../components/main/main.component';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule
    ],
    providers: [
      {
        provide: ROUTES,
        useFactory: configIndexHandlerRoutes,
        deps: [AuthService],
        multi: true
      }
    ]
  })
  
  
  export class IndexHandlerRoutingModule {}
  
  export function configIndexHandlerRoutes(authService: AuthService) {
    let routes: Routes = [];
    let token = authService.getToken();
    if (token) {
      routes = [
        {
            path: '', component: MainComponent
        }
      ];
    } else {       
      routes = [
        {
            path: '', component: LoginComponent
        }
      ];
    }
    return routes;
  }