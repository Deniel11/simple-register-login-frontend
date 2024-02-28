import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { UserComponent } from './user/user.component';
import { OtherUserComponent } from './other-user/other-user.component';
import { UsersComponent } from './users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { TranslateComponent } from '../translate/translate.component';

const routes: Routes = [ 
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'user/:id',
        component: OtherUserComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'edit-user/:id',
        component: EditUserComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
