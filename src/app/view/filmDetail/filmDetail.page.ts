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
import { NoteService } from "src/app/services/note.service"


/* Services Listes */
import { ListeService } from "src/app/services/liste.service"




/* Forms */
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TabListModules } from '../tabList/tabList.module';

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
  private favorite: boolean = false;
  listeFilmFavoris: any;
  listeFilmAVoir: any;
  rateAverage : any = null;


  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private commentService: CommentService,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private listeService : ListeService,
    private noteService: NoteService ) {}

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
      //Note
      this.getNoteAuth();
      this.getNoteAverage()
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

    this.getFilmFavoris();
    this.getFilmAVoir();

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

  ajoutFilmFavoris(){
    console.log("Passage dans Films Favoris");
    this.listeService.ajoutContenu(this.movieID, this.movie.title, this.movie.poster_path, "FilmFavoris");
  }

  ajoutFilmAVoir() {

    this.listeService.ajoutContenu(this.movieID, this.movie.title, this.movie.poster_path, "FilmVoir");
  }

  deleteFilmFavoris() {

    this.listeService.delete(this.movieID, "FilmFavoris");
  }

  deleteFilmAVoir() {

    this.listeService.delete(this.movieID, "FilmVoir");
  }

  /* ok */
  getFilmFavoris() {

    this.listeService.getContenu("FilmFavoris").valueChanges().subscribe((values) => {
      values.forEach((value) =>
        this.listeFilmFavoris = value,

      );

      // If you want Moniteurs to be just the new data
      console.log(this.listeFilmFavoris)
      this.listeFilmFavoris = values;
    });
  }

  getFilmAVoir() {

    this.listeService.getContenu("FilmVoir").valueChanges().subscribe((values) => {
      values.forEach((value) =>
        this.listeFilmAVoir = value,

      );

      this.listeFilmAVoir = values;

    });
  }

  getCompareFilmFavoris() : boolean {

    for(let element of this.listeFilmFavoris){
      console.log(element);
      if(this.movieID == element.id_coucou){

        return true;
      }
    }
    
    return false;
    
  }

  getCompareFilmEnvie(): boolean {

    for (let element of this.listeFilmAVoir) {
      console.log(element);
      if (this.movieID == element.id_coucou) {

        return true;
      }
    }


    return false;

  }

  message(){
    alert("Cette fonctionnalité n'est pas encore disponible");
  }

  noteMovie(i: any) {
    if (i == this.rate) {
      this.noteService.downNoteCumulMovie(this.movieID, this.rate)
      this.rate = 0;
      this.noteService.deleteNoteMovie(this.movieID);
      this.noteService.downNumberNoteMovie(this.movieID)
      this.noteService.updateNoteAverageMovie(this.movieID)
    }
    else {
      this.noteService.updateNoteCumulMovie(this.movieID, i , this.rate);
      this.rate = i;
      this.noteService.upNumberNoteMovie(this.movieID)
      setTimeout(() => {
        this.noteService.addNoteMovie(this.movieID, this.rate)
      }, 400);
      
      
      this.noteService.updateNoteAverageMovie(this.movieID)
    }
  }


  getNoteAuth(){
   this.noteService.getNoteMovieAuth(this.movieID).valueChanges().subscribe(result => this.rate = result.note );
  }

  getNoteAverage(){
    this.noteService.getNoteAverageMovie(this.movieID).valueChanges().subscribe( item => { 
      this.rateAverage = item.note_moyenne
    });
  }

}
