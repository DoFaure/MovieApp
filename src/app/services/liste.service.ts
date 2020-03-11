import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ListeService {

  constructor(
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  listesList: AngularFireList<any>;
 

  /* OK */
  ajoutContenu(id: string, titre: string, poster: string, nom_liste : string) {
    console.log("Passage Ajout Contenu");
    return new Promise<any>((resolve, reject) => {
      this.afDatabase.database.ref('listes/' + this.afAuth.auth.currentUser.uid + '/' + nom_liste + '/' + id).set({
        titre : titre,
        id_coucou : id,
        poster : poster
      }).then(
        res => resolve(res),
      ).catch(function (err) {
        err => reject(err);
      });
    });
  }

  getContenu(nom_liste : string){
    this.listesList = this.afDatabase.list('/listes/' + this.afAuth.auth.currentUser.uid + '/' + nom_liste);
    console.log("Passage dans Get Contenu")
    console.log(this.listesList);
    return this.listesList;
  }

  delete(id_movies: string, nom_liste : string) {
    console.log("Passage dans delete film");
    this.afDatabase.database.ref('listes/' + this.afAuth.auth.currentUser.uid + '/' + nom_liste + '/' + id_movies).remove().then(
      res => {
        console.log(res);
       // this.confirmation();
      }).catch(function (error) {
        console.log("Remove failed: " + error.message)
      });
  }  

}
