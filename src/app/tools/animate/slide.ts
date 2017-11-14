/**
 * Created by 6396000843 on 2017/10/11.
 */

import {trigger, style,state,transition,animate,keyframes,AnimationMetadata} from '@angular/core';

export const slide = trigger('slide', [
  state('slideInLeft1', style({
    opacity:1
  })),
  state('slideInLeft2', style({
    opacity:1
  })),
  state('slideInLeft3', style({
    opacity:1
  })),
  state('slideInLeft4', style({
    opacity:1
  })),
  transition('* => slideInLeft1', [
    animate("500ms 0ms linear", keyframes([
      style({transform: 'translate3d(-100%, 0, 0)', offset: 0,opacity:0}),
      style({transform: 'translate3d(0, 0, 0)', offset: 1,opacity:1})
    ]))
  ]),
  transition('* => slideInLeft2', [
    animate("500ms 50ms linear", keyframes([
      style({transform: 'translate3d(-100%, 0, 0)', offset: 0,opacity:0}),
      style({transform: 'translate3d(0, 0, 0)', offset: 1,opacity:1})
    ]))
  ]),
  transition('* => slideInLeft3', [
    animate("500ms 120ms linear", keyframes([
      style({transform: 'translate3d(-100%, 0, 0)', offset: 0,opacity:0}),
      style({transform: 'translate3d(0, 0, 0)', offset: 1,opacity:1})
    ]))
  ]),
  transition('* => slideInLeft4', [
    animate("500ms 180ms linear", keyframes([
      style({transform: 'translate3d(-100%, 0, 0)', offset: 0,opacity:0}),
      style({transform: 'translate3d(0, 0, 0)', offset: 1,opacity:1})
    ]))
  ])
]);

