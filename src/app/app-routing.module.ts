import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }  from './home/home.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {PermissionComponent} from "./permission/permission.component";
import {GlobalSearchComponent} from "./home/global-search/global-search.component";
import {UserCenterComponent} from "./user/user-center/user-center.component";
import {CanDeactivateGuard} from "./admin/can-deactivate-guard.service";
import {CanActivateGuard} from "./admin/can-acitvate.service";


const routes: Routes = [
  { path: 'home',     component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'permission', component: PermissionComponent },

  { path: 'search', component: GlobalSearchComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
