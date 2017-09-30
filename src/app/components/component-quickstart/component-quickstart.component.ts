import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-quickstart',
  templateUrl: './component-quickstart.component.html',
  styleUrls: ['./component-quickstart.component.css']
})
export class ComponentQuickstartComponent implements OnInit {

  constructor() { }
  quickStartUrl:string;
  ngOnInit() {
    this.quickStartUrl=encodeURI(`rdk/service/app/ued/server/components/norm?name=新手入门`);
  }

}
