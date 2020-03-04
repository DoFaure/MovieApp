import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

import { AngularFireAuth } from '@angular/fire/auth';

import { NavController, AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentList: AngularFireList<any>;
  commentUser: AngularFireObject<any>;

  constructor( 
    private afDatabase : AngularFireDatabase,
    private afAuth : AngularFireAuth,
    private alertCtrl: AlertController,
    private navCtrl: NavController 
    ) { }

  addCommentMovie(value, movieID){
    return new Promise<any>((resolve, reject) => {
      this.afDatabase.database.ref('comments/movie/' + movieID + '/' + Date.now()).set({
        user: this.afAuth.auth.currentUser.uid,
        comment: value.commentary,
        date: Date.now()
      }).then(
        res =>resolve(res)
      ).catch(function (err) {
        err => reject(err);
      });
    });
  }

  // Get Single
  // getUserComment(movieID : string, uid: string) {
  //   this.commentUser = this.afDatabase.object('/comments/movie/' + movieID + '/' + uid);
  //   return this.commentUser;
  // }

  // Get List
  getCommentMovieList(movieID : string) {
    this.commentList = this.afDatabase.list('/comments/movie/' + movieID);
    return this.commentList;
  }

  deleteCommentMovie(movie: string, date : string){
    this.afDatabase.database.ref('/comments/movie/'+ movie + '/' + date ).remove().then(
      res => {
        console.log(res);
        this.confirmation();
      }).catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
  }

  addCommentSerie(value, serieID){
    return new Promise<any>((resolve, reject) => {
      this.afDatabase.database.ref('comments/serie/' + serieID + '/' + Date.now()).set({
        user: this.afAuth.auth.currentUser.uid,
        comment: value.commentary,
        date: Date.now()
      }).then(
        res =>resolve(res)
      ).catch(function (err) {
        err => reject(err);
      });
    });
  }

  // Get Single
  // getUserSerieComment(serieID : string, uid: string) {
  //   this.commentUser = this.afDatabase.object('/comments/serie/' + serieID + '/' + uid);
  //   return this.commentUser;
  // }

  // Get List
  getCommentSerieList(serieID : string) {
    this.commentList = this.afDatabase.list('/comments/serie/' + serieID);
    return this.commentList;
  }

  deleteCommentSerie(serieID: string, date : string){
    this.afDatabase.database.ref('/comments/serie/'+ serieID + '/' + date ).remove().then(
      res => {
        console.log(res);
        this.confirmation();
      }).catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
  }
  
  async confirmation() {
    let alertPopup = await this.alertCtrl.create({
            header: 'Commentaire supprimé',
            message: 'Votre commentaire a bien été supprimé',
            buttons:  [{
              text: 'Ok',
          }]
    });
    await alertPopup.present();
  }
}
