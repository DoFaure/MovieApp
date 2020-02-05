import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";

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

  // @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  popularMovieList: Movie[] = [];
  bestMovieList: Movie[] = [];
  upcomingMovieList: Movie[] = [];
  nowPlayingMovieList: Movie[] = [];
  pageCount: number = 1;
  isDataLoaded: boolean = false;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getPopularMovies(1);
    this.getBestMovies(1);
    this.getUpcomingMovies(1);
    this.getNowPlayingMovies(1);
  }

  private getPopularMovies(pageNumber: number) {
    this.isDataLoaded = false;
    this.movieService.getPopularMovies(pageNumber).subscribe(movieResponse => {
      this.popularMovieList = this.popularMovieList.concat(movieResponse);
      // this.infiniteScroll.complete();
      this.isDataLoaded = true;
    });      
  }

  private getBestMovies(pageNumber: number) {
    this.isDataLoaded = false;
    this.movieService.getTopRatedMovies(pageNumber).subscribe(movieResponse => {
      this.bestMovieList = this.bestMovieList.concat(movieResponse);
      // this.infiniteScroll.complete();
      this.isDataLoaded = true;
    });      
  }

  private getUpcomingMovies(pageNumber: number) {
    this.isDataLoaded = false;
    this.movieService.getTopUpcomingMovies(pageNumber).subscribe(movieResponse => {
      this.upcomingMovieList = this.upcomingMovieList.concat(movieResponse);
      // this.infiniteScroll.complete();
      this.isDataLoaded = true;
    });      
  }

  private getNowPlayingMovies(pageNumber: number) {
    this.isDataLoaded = false;
    this.movieService.getTopNowPlayingMovies(pageNumber).subscribe(movieResponse => {
      this.nowPlayingMovieList = this.nowPlayingMovieList.concat(movieResponse);
      // this.infiniteScroll.complete();
      this.isDataLoaded = true;
    });      
  }

  // loadMoreMovies() {
  //   this.pageCount = this.pageCount + 1;
  //   this.getMovies(this.pageCount);
  // }
}

