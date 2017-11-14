import {Component, OnInit} from '@angular/core';
import { PLATFORM_ID ,Inject} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GlobalService } from "./admin/global.service";
import { Router, NavigationEnd,NavigationError,NavigationStart } from '@angular/router';
import { routeAnimation } from './animations/animate';
import { PageAnimateService } from "./animations/service/page-animate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
  animations: [routeAnimation]
})
export class AppComponent implements OnInit {

  isHomePage: boolean = false;
  isBrowser:boolean=true;
  constructor(
    private globalService: GlobalService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId : Object
  ) {}
  routerState: boolean = true;
  routerStateCode: string = 'active';
  ngOnInit() {
    if(this.router.url.match(/(home$)/gi)){
      this.isHomePage = true;
    }
    this.globalService.ifHomePage
      .subscribe(
        (isHomePage: boolean) => {
          this.isHomePage = isHomePage
        }
      );
    if (!isPlatformBrowser(this.platformId)) {
      this.isBrowser=false;
    }
    //console.log("---- ued animate start -------");
    //if (isPlatformBrowser(this.platformId)) {
    //  this.router.events.subscribe(event => {
    //    if(event['url'] && event['url'].match(/(home$)/gi)){
    //      this.isHomePage = true;
    //    }
    //    if(event['url'] && !event['url'].match(/(home$)|(components$)|(post$)|(team$)|(projects$)/gi)){
    //      return
    //    }
    //    if(event instanceof NavigationStart){
    //      this._pageAnimateService.show();
    //    }
    //    if (event instanceof NavigationEnd || event instanceof NavigationError) {
    //      this._pageAnimateService.hide();
    //      this.routerState = !this.routerState;
    //      this.routerStateCode = this.routerState ? 'active' : 'inactive';
    //    }
    //  });
    //  console.log("---- ued animate end -------");
    //}
  }
}


