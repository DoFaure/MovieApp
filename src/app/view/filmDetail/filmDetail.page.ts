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

/* Forms */
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { resolve } from 'url';



@Component({
  selector: "app-filmDetail",
  templateUrl: "filmDetail.page.html",
  styleUrls: ["filmDetail.page.scss"]
})
export class filmDetailPage implements OnInit {

  currentUser: string =" "
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
    private formBuilder: FormBuilder ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.userDetails().uid
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
      let commentRes = this.commentService.getCommentMovieList(this.movieID);
      commentRes.snapshotChanges().subscribe(res => {
        this.comments = [];
        res.forEach(item => {
          let a = item.payload.toJSON();
          a['date'] = item.key;
          a['uid'] = item.payload.child('user').val();
          this.authService.getUsername(item.payload.child('user').val())
            .then(username=>{
              a['username'] = username.val().nomUtilisateur
             })
             .catch(error=>{
             console.log('OOPS, error', error)
             })
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
    this.commentService.getCommentMovieList(this.movieID).valueChanges().subscribe(res => {
    })
  }

  sendComment(value){
    this.commentService.addCommentMovie(value, this.movieID);
  }

  deleteComment(movie: string, date : string){
    this.commentService.deleteCommentMovie(movie, date);
  }
}
