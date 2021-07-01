import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPokemon, IPokemonResult } from '../models/pokemon.interface';
import { pluck, take, tap } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  urlIdLookup: any;
  pokemons: IPokemonResult[] = [];
  text: string = ''; 
  filteredPokemon: IPokemonResult[] = [];
  results: IPokemonResult[] = [];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initPokemonData();
  }

  private async initPokemonData(): Promise<void> {
    this.http
      .get<IPokemon>('https://pokeapi.co/api/v2/pokemon?offset=0')
      .pipe(
        take(1),
        pluck('results'),
        tap((results: IPokemonResult[]) => {
          this.urlIdLookup = results.reduce((acc, curr, idx) => (
            acc = { ...acc, [curr.name]: idx + 1}), {});
        }), 
      )
      .subscribe((result: IPokemonResult[]) => {
        this.pokemons = this.filteredPokemon = result;
      });
  }

  public onChange(updatedValue: string): void {
    this.filteredPokemon = this.pokemons.filter((pokemon: IPokemonResult) => pokemon.name.includes(updatedValue));
  }

}
