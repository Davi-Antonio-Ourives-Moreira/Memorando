import { animate, keyframes, query, style, transition, trigger } from "@angular/animations";

export const formInvalid = trigger('formInvalid', [
  transition('* => *', [
    query('input.ng-invalid:focus, select.ng-invalid:focus', [
      animate('0.5s', keyframes([
        style({border: '4px solid red'}),
        style({ transform: 'translateX(0)'}),
        style({ transform: 'translateX(-10px)'}),
        style({ transform: 'translateX(10px)'}),
        style({ transform: 'translateX(-10px)'}),
        style({ transform: 'translateX(10px)'}),
        style({ transform: 'translateX(-10px)'}),
        style({ transform: 'translateX(10px)'}),
        style({ transform: 'translateX(0)'})
      ]))
    ], {optional: true})
  ])
])
