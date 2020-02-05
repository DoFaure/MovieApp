/* Core */
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

/* Models */
import { Movie } from "src/app/models/movie";

/* Services */
import { MovieService } from "src/app/services/movie/movie.service";

@Component({
  selector: "app-filmList",
  templateUrl: "filmList.page.html",
  styleUrls: ["filmList.page.scss"]
})
export class filmListPage implements OnInit {
  
  @ViewChild(IonInfiniteScroll, {static:false}) infiniteScroll: IonInfiniteScroll;
  movieList: Movie[] = [];
  pageCount: number = 1;
  category: string = "";
  title: string = ""; 
  isDataLoaded: boolean = false;
  constructor(private movieService: MovieService, 
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.paramMap.get('category');
    this.getMovies(this.category, 1);
    switch(this.category){
      case "upcoming":
        this.title = "Bientôt au cinéma"
        break;
      case "popular":
        this.title = "Films du moment"
        break;
      case "nowPlaying":
        this.title = "Au cinéma en ce moment"
        break;
      case "topRated":
        this.title = "Films les mieux notés"
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

  loadMoreMovies() {
    this.pageCount = this.pageCount + 1;
    this.getMovies(this.category, this.pageCount);
  }
}
