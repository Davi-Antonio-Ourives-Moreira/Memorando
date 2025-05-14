import { animate, group, query, style, transition, trigger } from "@angular/animations";


export const formButtonAnimation = trigger('formButton', [
  transition('invalid => valid', [
    query('#botao-salvar', [
      group([
        animate(200, style({ backgroundColor: '#63B77C' })),
        animate(100, style({ transform: 'scale(1.1)' })),
      ]),

      animate(200, style({ transform: 'scale(1)' }))
    ])
  ]),

  transition('valid => invalid', [
    query('#botao-salvar', [
      group([
        animate(200, style({ backgroundColor: '#6C757D' })),
        animate(100, style({ transform: 'scale(1.1)' })),
      ]),

      animate(200, style({ transform: 'scale(1)' }))
    ])
  ])
])
