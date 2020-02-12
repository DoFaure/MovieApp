import { Movie } from "./movie";

export interface SearchMoviesResponse {
    page: number;
    results: SearchMovies[];
    total_results: number;
    total_pages: number;
}

export interface SearchMovies {
    page : Number;
    results : Array<Movie>
    total_pages : Number;
    total_results : Number;
}


