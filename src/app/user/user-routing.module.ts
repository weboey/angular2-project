import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserCenterComponent} from "./user-center/user-center.component";
import {UserInformationComponent} from "./user-center/user-information/user-information.component";
import {UserPostComponent} from "./user-center/user-post/user-post.component";
import {ModifyPasswordComponent} from "./user-center/modify-password/modify-password.component";
import {CanActivateGuard} from "../admin/can-acitvate.service";
import {PermissionComponent} from "./permission/permission.component";


const UserRoutes: Routes = [
  {
    path: 'user',
    children:[
      {path: 'permission', component: PermissionComponent,canActivate: [CanActivateGuard]},
      { path: 'center', component: UserCenterComponent,
        canActivateChild: [CanActivateGuard],
        children:[
          {path:'', redirectTo:'information', pathMatch:'full'},
          {path: 'information', component: UserInformationComponent},
          {path: 'post', component: UserPostComponent},
          {path: 'modify-password', component: ModifyPasswordComponent},
        ]
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(UserRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
