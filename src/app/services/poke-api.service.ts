import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { EvolutionChain } from '../model/evolucion.model';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private http: HttpClient) { }

  getPokemonList(offset = 0) {
    return this.http
      .get(`${environment.pokemonApi.baseUrl}/pokemon?offset=${offset}&limit=25`)
      .pipe(
        map(result => {
          return result['results'];
        }),
        map(pokemon => {
          return pokemon.map((poke, index) => {
            poke.image = this.getPokeImage(offset + index + 1);
            poke.pokeIndex = offset + index + 1;
            return poke;
          })
        })
      )
  }

  getPokeImage(index: number) {
    return `${environment.pokemonApi.imageUrl}/${index}.png`;
  }

  getPokeDetails(index: number) {
    return this.http
      .get(`${environment.pokemonApi.baseUrl}/pokemon/${index}`)
      .pipe(
        map(poke => {
          let sprites = Object.keys(poke['sprites']);
          poke['images'] = sprites
          .map(spriteKey => poke['sprites'][spriteKey])
            .filter(img => img);
          return poke;
        })
      )
  }


  getSpecies(id: number) {
    return this.http.get(`${environment.pokemonApi.baseUrl}/pokemon-species/${id}`);
  }

  getEvolutionChain(url: string) {
    return this.http.get<EvolutionChain>(url);
  }


}
