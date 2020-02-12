import { Component } from '@angular/core';
import {  NavController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

export class User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  public user:User = new User();

  constructor(public navCtrl: NavController, public fAuth: AngularFireAuth){
  }

  async login() {
    try {
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log("Successfully logged in!");
        this.navCtrl.navigateRoot('tabs');
      }

    } catch (err) {
      console.error(err);
    }
  }
}
