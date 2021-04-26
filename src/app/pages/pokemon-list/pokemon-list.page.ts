import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, Platform } from '@ionic/angular';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {

  pokemonLisy: any[] = [];
  private offset = 0;
  backToTop: boolean;

  @ViewChild(IonContent) content: IonContent;


  constructor(private pokeApi: PokeApiService, private platform: Platform) { }

  ngOnInit() {
    this.pokeApi.getPokemonList().subscribe((data: any[]) => {
      this.pokemonLisy = data;
    })
  }

  loadData($event) {
    this.offset += 25;

    this.pokeApi.getPokemonList(this.offset).subscribe((res: any[]) => {
      $event.target.complete();
      this.pokemonLisy = this.pokemonLisy.concat(res);

      if (this.pokemonLisy.length >= 850) {
        $event.target.disabled = true;
      }
    });
  }

  logScrolling($event: { detail: { scrollTop: number } }) {
    if ($event.detail.scrollTop > this.platform.height()) {
      this.backToTop = true;
    } else {
      this.backToTop = false;
    }
  }

  goToTop() {
    this.content.scrollToTop(1000);
  }

}
