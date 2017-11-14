import {trigger, style, transition, animate, state, keyframes} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition("void => *", [
    style({ opacity: 0 }),
    animate("600ms  linear", keyframes([
      style({opacity: 0}),
      style({opacity: 0}),
      style({opacity: .3}),
      style({opacity: .5}),
      style({opacity: 1}),
    ]))
  ]),
  transition("* => void", [
    animate(600, style({ opacity: 0 }))
  ])
]);
