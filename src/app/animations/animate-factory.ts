/**
 * Created by 6396000843 on 2017/9/30.
 */
import { trigger, AnimationEntryMetadata } from '@angular/core';

import { zoom } from './zoom';
import { slide } from './slide';

//此方式无法通过aot
export const animateFactory = (duration: string|number = 500, delay: string|number = 0, easing: string = 'linear'): AnimationEntryMetadata => {

  let timing: string = [
    typeof(duration) === 'number' ? `${duration}ms` : duration,
    typeof(delay) === 'number' ? `${delay}ms` : delay,
    easing
  ].join(' ');
  console.log(timing);
  return trigger('animate', [
    //...zoom(timing),
    ...slide(timing)
  ]);
};
