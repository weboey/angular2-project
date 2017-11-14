/**
 * Created by 6396000843 on 2017/10/9.
 */
import {trigger, style, transition, animate, state, keyframes} from '@angular/animations';
const timing="600ms linear";
export const fade = trigger('fade', [
  state('fadeOut', style({
    display: 'none'
  })),
  state('fadeOutDown', style({
    display: 'none'
  })),
  state('fadeOutLeft', style({
    display: 'none'
  })),
  state('fadeOutRight', style({
    display: 'none'
  })),
  state('fadeOutUp', style({
    display: 'none'
  })),
  transition('* => fadeIn', [
    animate(timing, keyframes([
      style({opacity: 0, offset: 0}),
      style({opacity: 1, offset: 1})
    ]))
  ]),
  transition('fadeIn => void, * => fadeOut', [
    animate(timing, keyframes([
      style({opacity: 1, offset: 0}),
      style({opacity: 0, offset: 1})
    ]))
  ]),
  transition('* => fadeInDown', [
    animate(timing, keyframes([
      style({opacity: 0, transform: 'translate3d(0, -100%, 0)', offset: 0}),
      style({opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1})
    ]))
  ]),
  transition('fadeInDown => void, * => fadeOutDown', [
    animate(timing, keyframes([
      style({opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 0}),
      style({opacity: 0, transform: 'translate3d(0, 100%, 0)', offset: 1})
    ]))
  ]),
  transition('* => fadeInLeft', [
    animate(timing, keyframes([
      style({opacity: 0, transform: 'translate3d(-100%, 0, 0)', offset: 0}),
      style({opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1})
    ]))
  ]),
  transition('fadeInLeft => void, * => fadeOutRight', [
    animate(timing, keyframes([
      style({opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 0}),
      style({opacity: 0, transform: 'translate3d(100%, 0, 0)', offset: 1})
    ]))
  ]),
  transition('* => fadeInRight', [
    animate(timing, keyframes([
      style({opacity: 0, transform: 'translate3d(100%, 0, 0)', offset: 0}),
      style({opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1})
    ]))
  ]),
  transition('fadeInRight => void, * => fadeOutLeft', [
    animate(timing, keyframes([
      style({opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 0}),
      style({opacity: 0, transform: 'translate3d(-100%, 0, 0)', offset: 1})
    ]))
  ]),
  transition('* => fadeInUp', [
    animate(timing, keyframes([
      style({opacity: 0, transform: 'translate3d(0, 20%, 0)', offset: 0}),
      style({opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1})
    ]))
  ]),

]);

