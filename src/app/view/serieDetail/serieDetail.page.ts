/* Core */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

/* Models */
import { Serie } from "src/app/models/series/serie";
import { Cast } from 'src/app/models/credit';

/* Services */
import { SerieService } from 'src/app/services/serie/serie.service'
import { CommentService } from "src/app/services/comment.service";
import { AuthenticateService } from "src/app/services/authentication.service"
import { NoteService } from "src/app/services/note.service"

/* Forms */
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-serieDetail',
  templateUrl: './serieDetail.page.html',
  styleUrls: ['./serieDetail.page.scss'],
})
export class SerieDetailPage implements OnInit {

  currentUser: string =" "
  private serieID: string = "";
  serie: Serie;
  castList: Cast[] = [];
  comments : any[] ;
  similarSeries: Serie[] = [];
  rate: number = 0;
  validations_form: FormGroup;
  rateAverage : any = null;


  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private serieService: SerieService,
    private commentService: CommentService,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private noteService: NoteService ) {}

  ngOnInit() {
    this.currentUser = this.authService.userDetails().uid
    this.serieID = this.activatedRoute.snapshot.paramMap.get('serieID');
    this.validations_form = this.formBuilder.group({
      commentary: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      id_serie: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
    setTimeout(() => {
      this.getSerieCredit();
      this.getSerieDetail();
      this.getSimilarSeries();
      //Note
      this.getNoteAuth();
      this.getNoteAverage()
      //Show comments
      this.fetchComments();
      let commentRes = this.commentService.getCommentSerieList(this.serieID);
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
    }, 100);
  }

  navigateBack() {
    this.navCtrl.back();
  }

  getSerieDetail() {
    this.serieService.getSerieDetail(this.serieID).subscribe(d => {
      this.serie = d;
    });
  }

  getSerieCredit() {
    this.serieService.getSerieCredit(this.serieID).subscribe(d => {
      this.castList = d ;
    });
  }

  getSimilarSeries(){
    this.serieService.getSimilarSerie(this.serieID).subscribe(d => {
      this.similarSeries = d;
    })
  }

  fetchComments(){
    this.commentService.getCommentSerieList(this.serieID).valueChanges().subscribe(res => {
    })
  }

  sendComment(value){
    this.commentService.addCommentSerie(value, this.serieID );
  }

  deleteComment(serie: string, date : string){
    this.commentService.deleteCommentSerie(serie, date);
  }

  noteSerie(i: any) {
    if (i == this.rate) {
      this.rate = 0;
      this.noteService.deleteNoteSerie(this.serieID);
      this.noteService.downNumberNoteSerie(this.serieID)
      this.noteService.downNoteCumulSerie(this.serieID, this.rate)
      this.noteService.updateNoteAverageSerie(this.serieID)
    }
    else {
      this.noteService.updateNoteCumulSerie(this.serieID, i , this.rate);
      this.rate = i;
      this.noteService.upNumberNoteSerie(this.serieID)
      setTimeout(() => {
        this.noteService.addNoteSerie(this.serieID, this.rate)
      }, 500);
      
      
      this.noteService.updateNoteAverageSerie(this.serieID)
    }
  }


  getNoteAuth(){
   this.noteService.getNoteSerieAuth(this.serieID).valueChanges().subscribe(result => this.rate = result.note );
  }

  getNoteAverage(){
    this.noteService.getNoteAverageSerie(this.serieID).valueChanges().subscribe( item => { 
      this.rateAverage = item.note_moyenne
    });
  }
}
