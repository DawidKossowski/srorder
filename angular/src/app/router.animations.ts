import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
  trigger('fadeInAnimation', [
    transition(':enter', [
      style({ transform: 'translate(100%, 100%) rotateY(0)' }),
      animate('.4s', style({ transform: 'translate(0, 0) rotateY(360deg)' }))
    ]),
  ]);
