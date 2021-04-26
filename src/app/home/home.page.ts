import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slides = [
    {
      img: 'assets/img/1.svg',
      titulo: 'Hola, bienvenido a <br> <b>PokeApp</b>'
    },
    {
      img: 'assets/img/2.svg',
      titulo: 'Conoce más sobre el mundo Pokemón'
    },
    {
      img: 'assets/img/3.svg',
      titulo: '¿Estás listo?, <br> comencemos...'
    }
  ]

  constructor() {}

}
