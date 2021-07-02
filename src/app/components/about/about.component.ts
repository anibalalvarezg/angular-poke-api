import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPokemonInfo } from '../models/pokemon.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  private routeId: string = '';
  public pokemonObs$: Observable<IPokemonInfo> = new Observable<IPokemonInfo>();
  constructor(
    private router: ActivatedRoute, 
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.routeId = this.router.snapshot?.params?.id || '';
    this.initPokemonData();
  }

  private async initPokemonData(): Promise<void> {
    this.pokemonObs$ = this.http.get<IPokemonInfo>(`https://pokeapi.co/api/v2/pokemon/${this.routeId}`); 
  }

}
