/**
 * Created by 6396000843 on 2017/9/25.
 */
import { Injectable }    from '@angular/core';

import { Observable }    from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";


@Injectable()
export class GlobalService{

  public ifHomePage$: Subject<boolean> = new Subject<boolean>();

  public get ifHomePage():Observable<boolean>{
    return this.ifHomePage$.asObservable();
  }
  public setHomePage(b:boolean){
    this.ifHomePage$.next(b);
  }

}
