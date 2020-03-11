import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

import { AngularFireAuth } from '@angular/fire/auth';
import { element, Key } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  noteList: AngularFireList<any>;
  note: AngularFireObject<any>;
  noteAverage: AngularFireObject<any>;

  constructor( 
    private afDatabase : AngularFireDatabase,
    private afAuth : AngularFireAuth,
  ) { }


  // __________________________________MOVIE______________________________________//
  addNoteMovie(movieID, note){
    return new Promise<any>((resolve, reject) => {
      this.afDatabase.database.ref('notes/movie/' + movieID + '/' + this.afAuth.auth.currentUser.uid).set({
        note: note
      }).then(
        res =>resolve(res)
      ).catch(function (err) {
        err => reject(err);
      });
    });
  }
  //permet de mettre à jour le nombre de votant
  upNumberNoteMovie(movieID){
    this.afDatabase.database.ref('notes/movie/' + movieID + '/' + this.afAuth.auth.currentUser.uid).once("value",snapshot => {
      if (!snapshot.exists()){
        this.afDatabase.database.ref('notes/movie/' + movieID).child('nombre_votant').transaction(function(nombre_votant) {
          return (nombre_votant || 0) + 1
        }) 
      }
    });      
  }
 
  downNumberNoteMovie(movieID){
    this.afDatabase.database.ref('notes/movie/' + movieID).child('nombre_votant').transaction(function(nombre_votant) {
      return (nombre_votant || 0) - 1
    })
  }

  updateNoteCumulMovie(movieID, note, oldNote){

        this.afDatabase.database.ref('notes/movie/' + movieID).child('note_cumul').transaction(function(note_cumul) {
          return note_cumul = (note_cumul - oldNote + (note))
        })
  }

  downNoteCumulMovie(movieID, oldnote){
    this.afDatabase.database.ref('notes/movie/' + movieID).child('note_cumul').transaction(function(note_cumul) {
      return note_cumul = (note_cumul - (oldnote))
    })
  }

  updateNoteAverageMovie(movieID){
    let data = this.afDatabase.database.ref('notes/movie/' + movieID);
    let moy;
    let nb;
    data.once('value', (snapshot) => {
      moy = snapshot.val().note_cumul
      nb = snapshot.val().nombre_votant 

      this.afDatabase.database.ref('notes/movie/' + movieID).child('note_moyenne').transaction(function(note_moyenne) {
        return note_moyenne = moy / nb
      })
    })
   
  }

  deleteNoteMovie(movie: string){
    this.afDatabase.database.ref('/notes/movie/'+ movie + '/' + this.afAuth.auth.currentUser.uid).remove().then(
      res => {
        console.log(res);
      }).catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
  }

  getNoteMovieList(movieID : string) {
    this.noteList = this.afDatabase.list('/notes/movie/' + movieID);
    return this.noteList;
  }

  getNoteAverageMovie(movieID : string) {
    this.noteAverage = this.afDatabase.object('/notes/movie/' + movieID);
    return this.noteAverage;
  }

  getNoteMovieAuth(movieID){
    this.note = this.afDatabase.object('notes/movie/' + movieID + '/' + this.afAuth.auth.currentUser.uid) 
    return this.note;
  }


// __________________________________SERIE______________________________________//
addNoteSerie(serieID, note){
  return new Promise<any>((resolve, reject) => {
    this.afDatabase.database.ref('notes/serie/' + serieID + '/' + this.afAuth.auth.currentUser.uid).set({
      note: note
    }).then(
      res =>resolve(res)
    ).catch(function (err) {
      err => reject(err);
    });
  });
}
//permet de mettre à jour le nombre de votant
upNumberNoteSerie(serieID){
  this.afDatabase.database.ref('notes/serie/' + serieID + '/' + this.afAuth.auth.currentUser.uid).once("value",snapshot => {
    if (!snapshot.exists()){
      this.afDatabase.database.ref('notes/serie/' + serieID).child('nombre_votant').transaction(function(nombre_votant) {
        return (nombre_votant || 0) + 1
      }) 
    }
  });      
}

downNumberNoteSerie(serieID){
  this.afDatabase.database.ref('notes/serie/' + serieID).child('nombre_votant').transaction(function(nombre_votant) {
    return (nombre_votant || 0) - 1
  })
}

updateNoteCumulSerie(serieID, note, oldNote){

      this.afDatabase.database.ref('notes/serie/' + serieID).child('note_cumul').transaction(function(note_cumul) {
        return note_cumul = (note_cumul - oldNote + (note))
      })
}

downNoteCumulSerie(serieID, oldnote){
  this.afDatabase.database.ref('notes/serie/' + serieID).child('note_cumul').transaction(function(note_cumul) {
    return note_cumul = (note_cumul - (oldnote))
  })
}

updateNoteAverageSerie(serieID){
  let data = this.afDatabase.database.ref('notes/serie/' + serieID);
  let moy;
  let nb;
  data.once('value', (snapshot) => {
    moy = snapshot.val().note_cumul
    nb = snapshot.val().nombre_votant 

    this.afDatabase.database.ref('notes/serie/' + serieID).child('note_moyenne').transaction(function(note_moyenne) {
      return note_moyenne = moy / nb
    })
  })
 
}

deleteNoteSerie(serie: string){
  this.afDatabase.database.ref('/notes/serie/'+ serie + '/' + this.afAuth.auth.currentUser.uid).remove().then(
    res => {
      console.log(res);
    }).catch(function(error) {
      console.log("Remove failed: " + error.message)
    });
}

getNoteSerieList(serieID : string) {
  this.noteList = this.afDatabase.list('/notes/serie/' + serieID);
  return this.noteList;
}

getNoteAverageSerie(serieID : string) {
  this.noteAverage = this.afDatabase.object('/notes/serie/' + serieID);
  return this.noteAverage;
}

getNoteSerieAuth(serieID){
  this.note = this.afDatabase.object('notes/serie/' + serieID + '/' + this.afAuth.auth.currentUser.uid) 
  return this.note;
}
  
}
