/* Core */
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

/* Models */
import { Movie } from "src/app/models/movie";
import { Cast } from 'src/app/models/credit';

/* Services */
import { MovieService } from "src/app/services/movie/movie.service";

@Component({
  selector: "app-filmDetail",
  templateUrl: "filmDetail.page.html",
  styleUrls: ["filmDetail.page.scss"]
})
export class filmDetailPage implements OnInit {
  
  private movieID: string = "";
  movie: Movie;
  castList: Cast[] = [];
  similarMovies: Movie[] = [];
  rate: number = 0;

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService ) {}

  ngOnInit(): void {
    this.movieID = this.activatedRoute.snapshot.paramMap.get('movieID');
    setTimeout(() => {
      this.getMovieCredit();
      this.getMovieDetail();
      this.getSimilarMovies();
    }, 100);
  }

  navigateBack() {
    this.navCtrl.pop();
  }

  getMovieDetail() {
    this.movieService.getMovieDetail(this.movieID).subscribe(d => {
      this.movie = d;
    });
  }

  getMovieCredit() {
    this.movieService.getMovieCredit(this.movieID).subscribe(d => {
      this.castList = d ;
    });
  }
 
  getSimilarMovies() {
    this.movieService.getSimilarMovies(this.movieID).subscribe(d => {
      this.similarMovies = d;
    });
  }
}
