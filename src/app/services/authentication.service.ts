import { Injectable } from "@angular/core";
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
 
@Injectable()
export class AuthenticateService {
 
  constructor(private navCtrl : NavController){}
 
  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then((auth : any)=> {
        return firebase.database().ref('users/' + auth.user.uid).set({
          email: value.email,
          uid: auth.user.uid
        });
      }), 
      res => resolve(res),
      err => reject(err),
      this.navCtrl.navigateForward('')    
   })
  }
 
  loginUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
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
    return firebase.auth().currentUser;
  }
}