/**
 * Created by 6396000843 on 2017/8/4.
 */

import { Injectable,PLATFORM_ID ,Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response,RequestOptions, Request, RequestMethod } from '@angular/http';
import { User } from '../model/user-model';
import { rsa }  from './rsa';

@Injectable()
export class UserLoginService {
  //private userLoginURL = 'xplan/common/authentication';
  private userLoginURL = 'rdk/service/app/ued/server/user/user-login';
  private preparekeyURL = 'xplan/common/preparekey';
  private userCardURL = 'http://api.zte.com.cn/api/zte-km-icenter-address/v1/rest/user/queryUserCard';
  private userLocalURL = 'rdk/service/app/ued/server/user/local-user';

  public userInfo$: Subject<User> = new Subject<User>();

  public openLoginProp$: Subject<boolean> = new Subject<boolean>();

  publicKey:any;
  rsa :any;

  constructor(
    private http:Http,
    private activeRoute: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId : Object
  ){
    if (isPlatformBrowser(platformId)) {
      // RSA
      this.rsa = rsa.init();
      // 获取公钥
      this.requestPublicKey()
        .subscribe(
          data => {this.publicKey =  data},
          error => {console.error("获取公钥失败",error);}
        );
    }
  }
  //获取已登陆用户 Observable
  public get currentUser():Observable<User>{
    return this.userInfo$.asObservable();
  }
  //获取已登陆用户 Object
  public get currentUserGlobal():User{
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem("currentUser"))
    }
    return null
  }

  // 请求公钥
  requestPublicKey():any{
    return this.http
      .get(this.preparekeyURL)
      .map((response: Response) => {
        return response.json();
      });
  }
  // 请求登陆
  private requestLogin(authData){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let reqOptions = new RequestOptions({ headers: headers ,body:authData});
    return this.http
      .post(this.userLoginURL,null,reqOptions)
      .distinctUntilChanged()
      .map((response: Response) => {
        return response.json();
      })
      .map(this.transformUserObj);
  }
  //查询用户信息
  private requestQueryUserCard(user:User){
    //let queryParams = new URLSearchParams();
    //queryParams.set('curEmployeeShortId', '1');
    //queryParams.set('employeeShortId', ''+user.uid);
    return this.http
      .get(this.userCardURL+`?curEmployeeShortId=''&employeeShortId=${user.uid}`)
      .distinctUntilChanged()
      .map((response: Response) => {
        return response.json();
      })
      .map(this.transformUserCardInfo);
  }
  //查询用户信息
  private requestQueryUserLocal(user:User){
    //let queryParams = new URLSearchParams();
    //queryParams.set('curEmployeeShortId', '1');
    //queryParams.set('employeeShortId', ''+user.uid);
    return this.http
      .get(this.userLocalURL+`?uid=${user.uid}`)
      .map((response: Response) => {
        return response.json();
      })
  }


  transformUserObj(resUserData){
    let user: User={
      token:resUserData.tokens,
      uid:resUserData.contents.uid,
      userName:resUserData.contents.name,
      roles:resUserData.contents.roleId,
      team:resUserData.contents.team,
      dept:resUserData.contents.dept,
      email:resUserData.contents.mail,
      sex:"",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      company:"",
      headPicture:"",
      remeberMe:false
    };
    return user
  }

  transformUserCardInfo(data:any){
    var user = new User();
    if(data['bo'] && data['bo'][0]){
      user.sex=data['bo'][0].sex;
      user.email=data['bo'][0].email;
      if(data['bo'][0].contactList && data['bo'][0].contactList[0] && data['bo'][0].contactList[0].mainNumber){
        user.phoneNumber= data['bo'][0].contactList[0].mainNumber;
      }
    }
    return user
  }
  // RSA加密
  private encrypt = (keyInfo, str) => {
     let key = new this.rsa.getKeyPair(keyInfo.exponent,"",keyInfo.modules);
     return this.rsa.encryptedString(key, str);
  };
  public login(user:User){
    // 请求数据
    let authData = {
      keyID: this.publicKey.keyId,
      password: this.encrypt(this.publicKey, user.password),
      userID: user.userName
    };
    // 请求登陆
    this.requestLogin(authData)
      .subscribe(
        (user:User)=>{
          if(user && user.token){
            this.requestQueryUserCard(user)
              .mergeMap(data=>{
                Object.assign(user,data);
                return this.requestQueryUserLocal(user)
              })
              .subscribe(data=>{
                //保存登陆用户
                //Object.assign(user,data[0]);
                this._shallowCopy(user,data[0]);
                this.saveCurrentUser(user);
              })
          }
          this.router.navigate(['/home']);
        },
        this.handleError
      );
  }
  //todo:暂时保存在localStorage,需要保存在cookie里
  public saveCurrentUser(user:User){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("currentUser",JSON.stringify(user));
      this.userInfo$.next(Object.assign({},user));
    }
  }

  private _shallowCopy = function(target, source) {
    for (var key in source) {
      if(source[key]!=''){
        target[key] = source[key];
      }
    }
    return target;
  };
  //登陆成功
  private handleLoginSucces(user){}
  //错误处理
  private handleError(err){
    console.error("login service error!!!");
  }
  public logout():void{
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("currentUser");
    }
    this.userInfo$.next(null);
    this.router.navigate(['/home'], { relativeTo: this.activeRoute });
  }
}

/*
var _deepCopy= function(source) {
  var result={};
  for (var key in source) {
    result[key] = typeof source[key]==='object'? _deepCopy(source[key]): source[key];
  }
  return result;
};*/
