import { Component, OnInit, ViewChild } from '@angular/core';

/*Models*/

/*Services*/
import { AuthenticateService } from 'src/app/services/authentication.service'
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-tabProfil',
  templateUrl: 'tabProfil.page.html',
  styleUrls: ['tabProfil.page.scss']
})
export class TabProfilPage implements OnInit {

email: any;
nom: any;
nomUtilisateur: any;
prenom: any;
uid: any;

constructor(private authentificationservice:AuthenticateService, private afAuth:AngularFireAuth) {}

  
ngOnInit() : void{
  this.authentificationservice.getUserProfil().valueChanges()
  .subscribe((value) => {
      this.email = value.email
      this.nom = value.nom
      this.nomUtilisateur = value.nomUtilisateur
      this.prenom = value.prenom
      this.uid = value.uid

    });    
}

logout(){
  console.log("Passage dans Logout")
  this.authentificationservice.logoutUser();
}



}
