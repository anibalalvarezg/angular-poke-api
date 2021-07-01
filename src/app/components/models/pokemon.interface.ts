export interface IPokemonResult {
    name: string;
    url: string;
}

export interface IPokemon {
    count: number;
    next: string;
    previous?: any;
    results: IPokemonResult[];
}