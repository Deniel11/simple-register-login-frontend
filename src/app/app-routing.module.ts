import { NgModule } from '@angular/core';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: ROUTES,
      useFactory: configLoginRoutes,
      deps: [AuthService],
      multi: true
    }
  ]
})

export class AppRoutingModule { }

export function configLoginRoutes(authService: AuthService) {

  let routes: Routes = [];
  let token = authService.getToken();
  if (token) {
    routes = [
      {path: '', loadChildren: () => import('./components/main/main.module').then(m => m.MainModule)}
    ];
  } else {       
    routes = [
      {path: '', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)}
    ];
  }
  return routes;
}

