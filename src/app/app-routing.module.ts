import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [ 
  {path: 'register', component: RegisterComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: '**', loadChildren: () => import('./modules/index-handler-routing.module').then(m => m.IndexHandlerRoutingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
