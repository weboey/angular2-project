import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }  from './home/home.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {GlobalSearchComponent} from "./home/global-search/global-search.component";
import {UserCenterComponent} from "./user/user-center/user-center.component";
import {CanDeactivateGuard} from "./admin/can-deactivate-guard.service";
import {CanActivateGuard} from "./admin/can-acitvate.service";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',     component: HomeComponent},
  { path: 'search', component: GlobalSearchComponent },
  { path: 'projects', loadChildren: './projects/projects.module#ProjectModule'},
  { path: 'components', loadChildren: './components/components.module#ComponentsModule'},
  { path: 'post', loadChildren: './post/post.module#PostModule'},
  { path: 'tools', loadChildren: './tools/tools.module#ToolsModule'},
  { path: 'team', loadChildren: './team/team.module#TeamModule'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
