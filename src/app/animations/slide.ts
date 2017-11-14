/**
 * Created by 6396000843 on 2017/9/30.
 */
import {
    style,
    state,
    transition,
    animate,
    keyframes,
    AnimationMetadata
} from '@angular/core';

export const slide = (timing: string): AnimationMetadata[] => [
    state('slideOutDown', style({
        display: 'none'
    })),
    state('slideOutLeft', style({
        display: 'none'
    })),
    state('slideOutRight', style({
        display: 'none'
    })),
    state('slideOutUp', style({
        display: 'none'
    })),
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
    transition('* => slideInDown', [
        animate(timing, keyframes([
            style({transform: 'translate3d(0, -100%, 0)', offset: 0}),
            style({transform: 'translate3d(0, 0, 0)', offset: 1})
        ]))
    ]),
    transition('slideInDown => void, * => slideOutDown', [
        animate(timing, keyframes([
            style({transform: 'translate3d(0, 0, 0)', offset: 0}),
            style({transform: 'translate3d(0, 100%, 0)', offset: 1})
        ]))
    ]),
    transition('* => slideInLeft', [
        animate(timing, keyframes([
            style({transform: 'translate3d(-100%, 0, 0)', offset: 0}),
            style({transform: 'translate3d(0, 0, 0)', offset: 1})
        ]))
    ]),
    transition('slideInLeft => void, * => slideOutRight', [
        animate(timing, keyframes([
            style({transform: 'translate3d(0, 0, 0)', offset: 0}),
            style({transform: 'translate3d(100%, 0, 0)', offset: 1})
        ]))
    ]),
    transition('* => slideInRight', [
        animate(timing, keyframes([
            style({transform: 'translate3d(100%, 0, 0)', offset: 0}),
            style({transform: 'translate3d(0, 0, 0)', offset: 1})
        ]))
    ]),
    transition('slideInRight => void, * => slideOutLeft', [
        animate(timing, keyframes([
            style({transform: 'translate3d(0, 0, 0)', offset: 0}),
            style({transform: 'translate3d(-100%, 0, 0)', offset: 1})
        ]))
    ]),
    transition('* => slideInUp', [
        animate(timing, keyframes([
            style({transform: 'translate3d(0, 100%, 0)', offset: 0}),
            style({transform: 'translate3d(0, 0, 0)', offset: 1})
        ]))
    ]),
    transition('slideInUp => void, * => slideOutUp', [
        animate(timing, keyframes([
            style({transform: 'translate3d(0, 0, 0)', offset: 0}),
            style({transform: 'translate3d(0, -100%, 0)', offset: 1})
        ]))
    ]),

    transition('* => slideInLeft1', [
      animate("500ms 520ms linear", keyframes([
        style({transform: 'translate3d(-100%, 0, 0)', offset: 0,opacity:0}),
        style({transform: 'translate3d(0, 0, 0)', offset: 1,opacity:1})
      ]))
    ]),
    transition('* => slideInLeft2', [
      animate("500ms 670ms linear", keyframes([
        style({transform: 'translate3d(-100%, 0, 0)', offset: 0,opacity:0}),
        style({transform: 'translate3d(0, 0, 0)', offset: 1,opacity:1})
      ]))
    ]),
    transition('* => slideInLeft3', [
      animate("500ms 780ms linear", keyframes([
        style({transform: 'translate3d(-100%, 0, 0)', offset: 0,opacity:0}),
        style({transform: 'translate3d(0, 0, 0)', offset: 1,opacity:1})
      ]))
    ]),
    transition('* => slideInLeft4', [
      animate("500ms 850ms linear", keyframes([
        style({transform: 'translate3d(-100%, 0, 0)', offset: 0,opacity:0}),
        style({transform: 'translate3d(0, 0, 0)', offset: 1,opacity:1})
      ]))
    ])
];
