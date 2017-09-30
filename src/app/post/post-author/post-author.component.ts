import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-author',
  templateUrl: './post-author.component.html',
  styleUrls: ['./post-author.component.css']
})
export class PostAuthorComponent implements OnInit {

  public currentUser:any;

  constructor() { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

}
