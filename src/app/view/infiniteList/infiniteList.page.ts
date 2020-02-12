/* Core */
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { ActivatedRoute } from '@angular/router';

/* Models */
import { Movie } from "src/app/models/movie";
import { Serie } from "src/app/models/series/serie"

/* Services */
import { MovieService } from "src/app/services/movie/movie.service";
import { SerieService } from "src/app/services/serie/serie.service"; 

@Component({
  selector: "app-infiniteList",
  templateUrl: "infiniteList.page.html",
  styleUrls: ["infiniteList.page.scss"]
})
export class infiniteListPage implements OnInit {
  
  @ViewChild(IonInfiniteScroll, {static:false}) infiniteScroll: IonInfiniteScroll;
  movieList: Movie[] = [];
  serieList: Serie[] = [];
  pageCount: number = 1;
  category: string = "";
  title: string = ""; 
  isDataLoaded: boolean = false;
  constructor(private movieService: MovieService,
    private serieService: SerieService, 
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.paramMap.get('category');
    switch(this.category){
      case "upcoming":
        this.title = "Bientôt au cinéma"
        this.getMovies(this.category, 1);
        break;
      case "popular":
        this.title = "Films du moment"
        this.getMovies(this.category, 1);
        break;
      case "nowPlaying":
        this.title = "Au cinéma en ce moment"
        this.getMovies(this.category, 1);
        break;
      case "topRated":
        this.title = "Films les mieux notés"
        this.getMovies(this.category, 1);
        break;
      case "today":
        this.title = "Series diffusées aujourd'hui"
        this.getSeries(this.category,1);
        break;
      case "popularSeries":
        this.title = "Series du moment";
        this.getSeries(this.category,1);
        break;
      case "best":
        this.title = "Meilleurs séries"
        this.getSeries(this.category,1);
        break;
      case "upcomingSeries":
        this.title = "Bientôt sur vos écrans"
        this.getSeries(this.category,1);
      break;
    }
  }

  private getMovies(category: string, pageNumber: number) {
    this.isDataLoaded = false;
    switch (category) {
      case "upcoming":
        this.movieService.getTopUpcomingMovies(pageNumber).subscribe(movieResponse => {
          this.movieList = this.movieList.concat(movieResponse);
          this.infiniteScroll.complete();
          this.isDataLoaded = true;
        });
        break;
      case "popular":
        this.movieService.getPopularMovies(pageNumber).subscribe(movieResponse => {
          this.movieList = this.movieList.concat(movieResponse);
          this.infiniteScroll.complete();
          // this.coreService.hideLoadingIcon();
          this.isDataLoaded = true;
        });
        break;
      case "nowPlaying":
        this.movieService.getTopNowPlayingMovies(pageNumber).subscribe(movieResponse => {
          this.movieList = this.movieList.concat(movieResponse);
          this.infiniteScroll.complete();
          this.isDataLoaded = true;
        });
        break;
      case "topRated":
        this.movieService.getTopRatedMovies(pageNumber).subscribe(movieResponse => {
          this.movieList = this.movieList.concat(movieResponse);
          this.infiniteScroll.complete();
          this.isDataLoaded = true;
        });
        break;
      default:
        break;
    }
  }

  private getSeries(category: string, pageNumber: number) {
    this.isDataLoaded = false;
    switch (category) {
      case "popularSeries":
        this.serieService.getPopularSerie(pageNumber).subscribe(serieResponse => {
          this.serieList = this.serieList.concat(serieResponse);
          this.infiniteScroll.complete();
          this.isDataLoaded = true;
        });
        break;
      case "best":
        this.serieService.getTopRatedSerie(pageNumber).subscribe(serieResponse => {
          this.serieList = this.serieList.concat(serieResponse);
          this.infiniteScroll.complete();
          this.isDataLoaded = true;
        });
        break;
      case "today":
        this.serieService.getDiffuseAujourdhuiSerieList(pageNumber).subscribe(serieResponse => {
          this.serieList = this.serieList.concat(serieResponse);
          this.infiniteScroll.complete();
          this.isDataLoaded = true;
        });
        break;
      case "upcomingSeries":
        this.serieService.getTopUpcomingSerie(pageNumber).subscribe(serieResponse => {
          this.serieList = this.serieList.concat(serieResponse);
          this.infiniteScroll.complete();
          this.isDataLoaded = true;
        });
        break;
      default:
        break;
    }
  }

  loadMore() {
    this.pageCount = this.pageCount + 1;
    if(this.movieList.length!=0){
       this.getMovies(this.category, this.pageCount);
    }else{
      this.getSeries(this.category, this.pageCount);
    }
   
  }

}
