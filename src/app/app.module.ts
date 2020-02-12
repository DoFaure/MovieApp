import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Database */
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'

/* Helpers */
import { CustomHttpInterceptor } from './core/custom-http.interceptor';

 

var CREDENTIALS = {
  apiKey: "AIzaSyAdJZD1u7cVrwmsUjT903YFJefC4YAzRGo",
  authDomain: "moviesplus-ed23b.firebaseapp.com",
  databaseURL: "https://moviesplus-ed23b.firebaseio.com",
  projectId: "moviesplus-ed23b",
  storageBucket: "moviesplus-ed23b.appspot.com",
  messagingSenderId: "860453629282",

};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(CREDENTIALS),
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}




