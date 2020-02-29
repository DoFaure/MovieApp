import { Injectable } from "@angular/core";
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database'
import { resolve } from 'url';
 
@Injectable()
export class AuthenticateService {
 
  constructor(private navCtrl : NavController, private afAuth : AngularFireAuth, private afDatabase : AngularFireDatabase){}
 
  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
     .then((auth : any)=> {
        return this.afDatabase.database.ref('users/' + auth.user.uid).set({
          email: value.email,
          uid: auth.user.uid
        }).then(function (){
          // send mail to the register user mail adress
          resolve(auth.user.sendEmailVerification())
        }).catch(function (err) {
          err => reject(err);
        });
      });
    })
  }

 
  loginUser(value){
   return new Promise<any>((resolve, reject) => {
     this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(this.afAuth.auth.currentUser){
        this.afAuth.auth.signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
 
  userDetails(){
    return this.afAuth.auth.currentUser;
  }
}