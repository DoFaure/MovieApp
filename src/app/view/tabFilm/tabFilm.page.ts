import { Component, OnInit, ViewChild } from "@angular/core";

/* Models */
import { Movie } from "src/app/models/movie";

/* Services */
import { MovieService } from "src/app/services/movie/movie.service";


@Component({
  selector: 'app-tabFilm',
  templateUrl: 'tabFilm.page.html',
  styleUrls: ['tabFilm.page.scss']
})
export class TabFilm implements OnInit {

  popularMovieList: Movie[] = [];
  bestMovieList: Movie[] = [];
  upcomingMovieList: Movie[] = [];
  nowPlayingMovieList: Movie[] = [];
  pageCount: number = 1;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getPopularMovies(1);
    this.getBestMovies(1);
    this.getUpcomingMovies(1);
    this.getNowPlayingMovies(1);
  }

  private getPopularMovies(pageNumber: number) {
    this.movieService.getPopularMovies(pageNumber).subscribe(movieResponse => {
      this.popularMovieList = this.popularMovieList.concat(movieResponse);
    });      
  }

  private getBestMovies(pageNumber: number) {
    this.movieService.getTopRatedMovies(pageNumber).subscribe(movieResponse => {
      this.bestMovieList = this.bestMovieList.concat(movieResponse);
    });      
  }

  private getUpcomingMovies(pageNumber: number) {
    this.movieService.getTopUpcomingMovies(pageNumber).subscribe(movieResponse => {
      this.upcomingMovieList = this.upcomingMovieList.concat(movieResponse);
    });      
  }

  private getNowPlayingMovies(pageNumber: number) {
    this.movieService.getTopNowPlayingMovies(pageNumber).subscribe(movieResponse => {
      this.nowPlayingMovieList = this.nowPlayingMovieList.concat(movieResponse);
    });      
  }

  // loadMoreMovies() {
  //   this.pageCount = this.pageCount + 1;
  //   this.getMovies(this.pageCount);
  // }
}

