/**
 * Created by 6396000843 on 2017/9/5.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { Http }                from '@angular/http';
import 'rxjs/add/operator/map';

@Pipe({
  name: 'showHeadImg'
  //pure: false
})
export class ShowHeadImgPipe implements PipeTransform {


  constructor(private http: Http) { }

  transform(user:any,size?:number){
    if(!user) return;
    let uid;
    if(typeof user=='object'){
      uid=user.uid;
      return user.headPicture || `http://zmail.zte.com.cn/Mapi/image/head/m${size || 1}/${uid.toString().substr(-3, 3)}/u${uid}.jpg`;
    }
    uid=user;
    return  `http://zmail.zte.com.cn/Mapi/image/head/m${size || 1}/${uid.toString().substr(-3, 3)}/u${uid}.jpg`;
  }
  //非纯管道--性能代价高，避免使用!pass
/*
  private cachedData: any = null;
  private cachedUid = '';
  private userHeadPictureURL = 'rdk/service/app/ued/server/user/local-user';
  transform(uid:string,size?:number) {
    console.log('--------->',uid);
    if(!uid) return;
    if (uid !== this.cachedUid) {
      this.cachedData = null;
      this.cachedUid = uid;
      this.http.get(this.userHeadPictureURL + `?file=image&uid=${uid}`)
        .map(result => result.json())
        .subscribe(result => {
          if(result.length){
            this.cachedData = result[0]["headPicture"]
          }
          if(this.cachedData=='' || this.cachedData==null){
            this.cachedData=`http://zmail.zte.com.cn/Mapi/image/head/m${size || 1}/${uid.toString().substr(-3, 3)}/u${uid}.jpg`;
          }
        });
    }
    return this.cachedData;
  }*/

}
