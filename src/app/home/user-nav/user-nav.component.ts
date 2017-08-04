import { Component, OnInit ,Input} from '@angular/core';
import { Home } from "../home";

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {
  @Input()
  navLists : Home[];
  constructor() { }

  ngOnInit() {
  }

}
