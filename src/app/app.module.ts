import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { UserComponent } from './components/main/user/user.component';
import { OtherUserComponent } from './components/main/other-user/other-user.component';
import { UsersComponent } from './components/main/users/users.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/login/change-password/change-password.component';
import { VerifyEmailComponent } from './components/login/verify-email/verify-email.component';
import { RegisterComponent } from './components/login/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SingInComponent } from './components/login/sing-in/sing-in.component';
import { EditUserComponent } from './components/main/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserComponent,
    OtherUserComponent,
    UsersComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    VerifyEmailComponent,
    RegisterComponent,
    LoginComponent,
    SingInComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatChipsModule,
    MatSelectModule,
    MatCardModule,

    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
