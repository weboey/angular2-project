import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GlobalSearchComponent} from "./global-search/global-search.component";


const HomeRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'search', component: GlobalSearchComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(HomeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
