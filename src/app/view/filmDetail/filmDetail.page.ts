/* Core */
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

/* Models */
import { Movie } from "src/app/models/movie";
import { Cast } from 'src/app/models/credit';
import { Comment } from 'src/app/models/comment'

/* Services */
import { MovieService } from "src/app/services/movie/movie.service";
import { CommentService } from "src/app/services/comment.service";
import { AuthenticateService } from "src/app/services/authentication.service"


/* Services Listes */
import { ListeService } from "src/app/services/liste.service"

/* Model Liste */
import { Liste } from "src/app/models/liste"



/* Forms */
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



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
  comments : any[] ;
  rate: number = 0;
  validations_form: FormGroup;


  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private commentService: CommentService,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private listeService : ListeService) {}

  ngOnInit(): void {
    this.movieID = this.activatedRoute.snapshot.paramMap.get('movieID');
    this.validations_form = this.formBuilder.group({
      commentary: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      id_movie: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
    setTimeout(() => {
      this.getMovieCredit();
      this.getMovieDetail();
      this.getSimilarMovies();
      //Show comments
      this.fetchComments();
      let commentRes = this.commentService.getCommentList(this.movieID);
      commentRes.snapshotChanges().subscribe(res => {
        this.comments = [];
        res.forEach(item => {
          let a = item.payload.toJSON();
          a['date'] = item.key;
          a['user'] = item.payload.child('user').val();
          this.comments.push(a as Comment);
        })
      })
    }, 1000);
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

  fetchComments(){
    this.commentService.getCommentList(this.movieID).valueChanges().subscribe(res => {
    })
  }

  sendComment(value){
    this.commentService.addComment(value);

  }

  ajoutFilmFavoris(){
    console.log("Passage dans Films Favoris");
    this.listeService.ajoutContenu(this.movieID, this.movie.title, this.movie.poster_path, "FilmFavoris");
  }

  ajoutFilmAVoir() {
    console.log("Passage dans Films A Voir");
    this.listeService.ajoutContenu(this.movieID, this.movie.title, this.movie.poster_path, "FilmVoir");
  }

  deleteFilmFavoris() {
    console.log("Passage dans Supression Films Favoris");
    this.listeService.delete(this.movieID, "FilmFavoris");
  }

  deleteFilmAVoir() {
    console.log("Passage dans Supression Films Favoris");
    this.listeService.delete(this.movieID, "FilmAVoir");
  }




}
