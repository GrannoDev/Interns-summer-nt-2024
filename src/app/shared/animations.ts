import { animate, state, style, transition, trigger } from '@angular/animations';

export const ExpandAnimation = trigger('expand', [
  state(
    'void',
    style({
      height: '0px',
      padding: '0px',
    })
  ),
  state(
    '*',
    style({
      height: '*',
    })
  ),
  transition('* <=> void', [animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
]);
export const FadeAnimation = trigger('fade', [
  state(
    'void',
    style({
      opacity: 0,
    })
  ),
  state(
    '*',
    style({
      opacity: 1,
    })
  ),
  transition('* <=> void', [animate('150ms ease-in-out')]),
]);
