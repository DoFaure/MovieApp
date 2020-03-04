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

/* Forms */
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { resolve } from 'url';


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


  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private serieService: SerieService,
    private commentService: CommentService,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder ) {}

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
}
