/**
 * Created by 6396000843 on 2017/10/10.
 */
import { Injectable,Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
//import * as Snap from './snap.svg-min';
//import * as mina from './snap.svg-min';

const mePageLoadingTemplate = '<div id="pageloader" class="pageload-overlay"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 60" preserveAspectRatio="none"><path /></svg></div>';
const mePageLoadingEffects = {
  'Lazy Stretch': {
    opening: 'M20,15 50,30 50,30 30,30 Z;M0,0 80,0 50,30 20,45 Z;M0,0 80,0 60,45 0,60 Z;M0,0 80,0 80,60 0,60 Z',
    closing: 'M0,0 80,0 60,45 0,60 Z;M0,0 80,0 50,30 20,45 Z;M20,15 50,30 50,30 30,30 Z;M30,30 50,30 50,30 30,30 Z',
    path: 'M30,30 50,30 50,30 30,30 Z',
    speedIn: 100
  },
  'Circle': {
    opening: 'M 40 -21.875 C 11.356078 -21.875 -11.875 1.3560784 -11.875 30 C -11.875 58.643922 11.356078 81.875 40 81.875 C 68.643922 81.875 91.875 58.643922 91.875 30 C 91.875 1.3560784 68.643922 -21.875 40 -21.875 Z',
    path: 'M40,30 c 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 Z',
    speedIn: 300,
    easingIn: 'easeinout'
  },
  'Spill': {
    opening: 'M 0,0 c 0,0 63.5,-16.5 80,0 16.5,16.5 0,60 0,60 L 0,60 Z',
    path: 'M 0,0 c 0,0 -16.5,43.5 0,60 16.5,16.5 80,0 80,0 L 0,60 Z',
    speedIn: 400,
    easingIn: 'easeinout'
  },
  'Frame it': {
    opening: 'M 0,0 0,60 80,60 80,0 Z M 40,30 40,30 40,30 40,30 Z',
    path: 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z',
    speedIn: 300,
    easingIn: 'easeinout'
  },
  'Tunnel vision': {
    opening: 'M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 29.96875 C 40.01804 29.96875 40.03125 29.98196 40.03125 30 C 40.03125 30.01804 40.01804 30.03125 40 30.03125 C 39.98196 30.03125 39.96875 30.01804 39.96875 30 C 39.96875 29.98196 39.98196 29.96875 40 29.96875 Z',
    path: 'M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 -25.6875 C 70.750092 -25.6875 95.6875 -0.7500919 95.6875 30 C 95.6875 60.750092 70.750092 85.6875 40 85.6875 C 9.2499078 85.6875 -15.6875 60.750092 -15.6875 30 C -15.6875 -0.7500919 9.2499078 -25.6875 40 -25.6875 Z',
    speedIn: 300,
    easingIn: 'easeinout'
  },
  'Windscreen wiper': {
    opening: 'M 40,100 150,0 -65,0 z',
    path: 'M 40,100 150,0 l 0,0 z',
    speedIn: 400,
    easingIn: 'easeinout'
  },
  'Parallelogram': {
    opening: 'M 0,0 0,60 80,60 80,0 z M 80,0 40,30 0,60 40,30 z',
    path: 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z',
    speedIn: 300,
    speedOut: 600,
    easingIn: 'easeinout',
    easingOut: 'bounce'
  },
  'Tilted': {
    opening: 'M 0,0 80,-10 80,60 0,70 0,0',
    path: 'M 0,70 80,60 80,80 0,80 0,70',
    speedIn: 400,
    easingIn: 'easeinout'
  },
  'Lateral Swipe': {
    opening: 'M 40,-65 145,80 -65,80 40,-65',
    closing: 'm 40,-65 0,0 L -65,80 40,-65',
    path: 'M 40,-65 145,80 40,-65',
    speedIn: 500,
    easingIn: 'easeinout'
  },
  'Wave': {
    opening: 'm -5,-5 0,70 90,0 0,-70 z m 5,35 c 0,0 15,20 40,0 25,-20 40,0 40,0 l 0,0 C 80,30 65,10 40,30 15,50 0,30 0,30 z',
    path: 'm -5,-5 0,70 90,0 0,-70 z m 5,5 c 0,0 7.9843788,0 40,0 35,0 40,0 40,0 l 0,60 c 0,0 -3.944487,0 -40,0 -30,0 -40,0 -40,0 z',
    speedIn: 400,
    easingIn: 'easeinout'
  },
  'Origami': {
    opening: 'm -10,-10 0,80 100,0 0,-80 z m 50,-30.5 0,70.5 0,70 0,-70 z',
    path: 'm -10,-10 0,80 100,0 0,-80 z M 40,-40.5 120,30 40,100 -40,30 z',
    speedIn: 400,
    easingIn: 'easeinout'
  },
  'Curtain': {
    opening: 'm 40,-80 190,0 -305,290 C -100,140 0,0 40,-80 z',
    path: 'm 75,-80 155,0 0,225 C 90,85 100,30 75,-80 z',
    speedIn: 700,
    easingIn: 'easeinout'
  }
};

class PageAnimate{
  options:any;
  el:any;
  path:any;
  effect:any;
  animateOpt:any;
  isAnimating:boolean;
  Snap:Function;
  mina:any;
  constructor(options,private platformId : Object){
    if (isPlatformBrowser(platformId)) {
      this.Snap =window["Snap"];
      this.mina=window["mina"];
    }
    var svg;
    this.options = options = Object.assign({
      speedIn: 500,
      easingIn: 'linear'
    }, options);

    if(!!options.el){
      this.el = options.el;
      svg = this.Snap(this.el.querySelector('svg'));
      this.path = svg.select('path');
      this.effect = options.effect || 'random';
      this.animateOpt = null;
      this.isAnimating = false;
    }

  }

  getOpt(newEffect){
    let effect,
      effects,
      effectObj,
      initialPath,
      openingSteps,
      openingStepsStr,
      openingStepsTotal,
      closingSteps,
      closingStepsStr,
      closingStepsTotal,
      animateOpt,
      speedOut,
      easingOut;

    effect = newEffect || this.effect;
    effects = Object.keys(mePageLoadingEffects);

    if(effect === 'random' || effects.indexOf(effect) < 0){
      effect = effects[Math.floor(Math.random() * 12)]
    }
    effectObj = mePageLoadingEffects[effect];

    initialPath = effectObj.path;

    openingStepsStr = effectObj.opening;
    openingSteps = openingStepsStr ? openingStepsStr.split(';') : '';
    openingStepsTotal = openingStepsStr ? openingSteps.length : 0;

    if(openingStepsTotal === 0){
      return false;
    }

    closingStepsStr = effectObj.closing || initialPath;
    closingSteps = closingStepsStr ? closingStepsStr.split(';') : '';
    closingStepsTotal = closingStepsStr ? closingSteps.length : 0;

    speedOut = effectObj.speedOut || effectObj.speedIn;
    easingOut = effectObj.easingOut || effectObj.easingIn;

    animateOpt = {
      initialPath: initialPath,
      openingSteps: openingSteps,
      openingStepsTotal: openingStepsTotal,
      closingSteps: closingSteps,
      closingStepsTotal: closingStepsTotal,
      speedOut: speedOut,
      easingOut: easingOut,
      speedIn: effectObj.speedIn,
      easingIn: effectObj.easingIn
    };

    return animateOpt;
  }

  show(newEffect?:any){
    var animateOpt;

    if(this.isAnimating){
      return false;
    }
    animateOpt = this.getOpt(newEffect);
    if(!animateOpt){
      return;
    }

    this.path.attr('d', animateOpt.initialPath);

    this.animateOpt = animateOpt;
    this.isAnimating = true;

    this.animateSVG('in', animateOpt, ()=>this.el.classList.add('pageloading-loading'));

    this.el.classList.add('show');
  }

  hide(){
    var animateOpt = this.animateOpt;
    if(!animateOpt){
      return false;
    }
    this.animateOpt = null;
    this.el.classList.remove('pageloading-loading');
    this.animateSVG('out', animateOpt,()=>{
      this.el.classList.remove('show');
      this.el.classList.remove('pageloading-loading');
      this.isAnimating = false;
    });
  }

  animateSVG(dir, animateOpt, cbk){
    var self = this,
      pos = 0,
      steps = dir === 'out' ? animateOpt.closingSteps : animateOpt.openingSteps,
      stepsTotal = dir === 'out' ? animateOpt.closingStepsTotal: animateOpt.openingStepsTotal,
      speed = dir === 'out' ? animateOpt.speedOut : animateOpt.speedIn,
      easing = dir === 'out' ? animateOpt.easingOut : animateOpt.easingIn,
      nextStep;

    easing = this.mina[easing] || this.mina['linear'];
    nextStep = function(pos){
      if(pos > stepsTotal - 1){
        if(cbk && typeof cbk == 'function'){
          cbk();
        }
        return;
      }

      self.path.animate({
        'path': steps[pos]
      }, speed, easing, function(){
        nextStep(pos);
      });
      pos++;
    };
    nextStep(pos);
  }
}

@Injectable()
export class PageAnimateService{

  public autoPageLoading:boolean = true;
  public effect:string = 'random';
  public timeOut:number = 500;

  public container:HTMLElement;

  loader:PageAnimate;

  constructor(@Inject(PLATFORM_ID) private platformId ?: Object){
    if (isPlatformBrowser(platformId)) {
      this.container =document.body;

      var self = this, loaderElement;

      var wrapperDiv = document.createElement('div');

      wrapperDiv.innerHTML=mePageLoadingTemplate;

      loaderElement = wrapperDiv.children[0];

      this.container.appendChild(loaderElement);

      this.loader = new PageAnimate({
        el: loaderElement,
        effect: self.effect
      },platformId);
    }
  }

  public show(effect?:any){
    this.loader.show(effect);
  }

  public hide(){
    setTimeout(()=>this.loader.hide(), this.timeOut);
  }
}
