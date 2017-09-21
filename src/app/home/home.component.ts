import { Component, OnInit,DoCheck } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,DoCheck {

  ww:string;
  temp:boolean=false;
  inputVal:string="";
  isEmpty:boolean=true;
  ngOnInit() {

  }
  changeStatus(){
    this.temp=!this.temp;
  }

  ngDoCheck():void {

    this.isEmpty= this.inputVal=='';

  }
}
