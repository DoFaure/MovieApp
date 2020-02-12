import { Component, OnInit } from '@angular/core';

/* Model */
import { Movie } from 'src/app/models/movie';
import { Serie } from 'src/app/models/series/serie';

/* Services */
import { MovieService } from "src/app/services/movie/movie.service";
import { SerieService } from "src/app/services/serie/serie.service";
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';


@Component({
  selector: 'app-tabSearch',
  templateUrl: 'tabSearch.page.html',
  styleUrls: ['tabSearch.page.scss']
})
export class Tab3Page implements OnInit {

  isDataLoaded: boolean;

  listF : Array<Movie> = [];
  listS: Array<Serie> = [];

  constructor(private serieService: SerieService, private movieService: MovieService) { }

  ngOnInit(): void { }

  private getSearchBar(input : string ){
   this.getSearchMovie(input);
   this.getSearchSerie(input);
  }

  private getSearchSerie ( search: string ){
    this.isDataLoaded = false;
    this.serieService.searchSerie(search).subscribe(serieResponse => {
      this.listS = serieResponse;
      this.isDataLoaded = true;
    });
    
  }
  
  private getSearchMovie ( input : string ){
    this.isDataLoaded = false;
    this.movieService.searchMovie(input).subscribe(movieResponse => {
      this.listF = movieResponse;
      this.isDataLoaded = true;
    });
  }

}

