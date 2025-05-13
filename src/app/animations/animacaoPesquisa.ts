import { animate, keyframes, style, transition, trigger } from "@angular/animations";

export const animacaoPesquisa = trigger('animacaoPesquisa', [
  transition(':enter', [
    style({opacity: 0, width: 0}),
    animate('400ms ease-out', keyframes([
      style({offset: 0, opacity: 0, width: 0}),
      style({offset: 0.8, opacity: 0.5, width: '*'}),
      style({offset: 1, opacity: 1, width: '*'})
    ]))
  ]),
  transition(':leave', [
    animate('400ms cubic-bezier(.18,.79,.83,.67)', style({opacity: 0, width: 0}))
  ])
]);
