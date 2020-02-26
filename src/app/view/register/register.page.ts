import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { NavController, AlertController } from '@ionic/angular';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 
 
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
   'email': [
     { type: 'required', message: 'L\'email est requis.' },
     { type: 'pattern', message: 'Entrez un email valide.' }
   ],
   'password': [
     { type: 'required', message: 'Mot de passe requis.' },
     { type: 'minlength', message: 'Le mot de passe doit contenir 6 caractéres minimum.' }
   ]
 };
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController
  ) {}
 
  ngOnInit(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }
 
  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.confirmation();
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }

  async confirmation() {
    let alertPopup = await this.alertCtrl.create({
            header: 'Confirmation création de compte',
            message: 'Votre compte a été créer. \n Veuillez valider votre adresse mail avant de vous connecter.',
            buttons:  [{
              text: 'Ok',
              handler: () => {
                    this.goLoginPage(); 
              }
          }]
    });
    await alertPopup.present();
  }
 
  goLoginPage(){
    this.navCtrl.navigateBack('');
  }
 
 
}
