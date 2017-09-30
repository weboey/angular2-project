import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const HomeRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }
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
