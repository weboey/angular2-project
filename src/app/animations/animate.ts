/**
 * Created by 6396000843 on 2017/10/9.
 */
import { AnimationEntryMetadata, state } from '@angular/core';
import { trigger, transition, animate, style, query, group,keyframes } from '@angular/animations';

export const routeAnimation: AnimationEntryMetadata =
  trigger('routeAnimation', [
    transition('* => *', [
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ])
  ]);


/*transition('* => slideInRight', [
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
  ])*/
