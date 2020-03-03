import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

import { AngularFireAuth } from '@angular/fire/auth';

/* Models */
import { Comment } from 'src/app/models/comment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentList: AngularFireList<any>;
  commentUser: AngularFireObject<any>;

  constructor( 
    private afDatabase : AngularFireDatabase,
    private afAuth : AngularFireAuth 
    ) { }

  addComment(value){
    return new Promise<any>((resolve, reject) => {
      this.afDatabase.database.ref('comments/' + value.id_movie + '/' + Date.now()).set({
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
  getUserComment(movieID : string, uid: string) {
    this.commentUser = this.afDatabase.object('/comments/' + movieID + '/' + uid);
    return this.commentUser;
  }

  // Get List
  getCommentList(movieID : string) {
    this.commentList = this.afDatabase.list('/comments/' + movieID);
    return this.commentList;
  }

}
