/* Core */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

/* Models */
import { Serie } from "src/app/models/series/serie";
import { Cast } from 'src/app/models/credit';

/* Services */
import { SerieService } from 'src/app/services/serie/serie.service'

/* Services Listes */
import { ListeService } from "src/app/services/liste.service"

@Component({
  selector: 'app-serieDetail',
  templateUrl: './serieDetail.page.html',
  styleUrls: ['./serieDetail.page.scss'],
})
export class SerieDetailPage implements OnInit {

  private serieID: string = "";
  serie: Serie;
  castList: Cast[] = [];
  similarSeries: Serie[] = [];
  rate: number = 0;

  listeSerieFavoris: any;
  listeSerieAVoir: any;

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private serieService: SerieService,
    private listeService: ListeService ) {}

  ngOnInit() {
    this.serieID = this.activatedRoute.snapshot.paramMap.get('serieID');
    setTimeout(() => {
      this.getSerieCredit();
      this.getSerieDetail();
      this.getSimilarSeries();
    }, 100);

    this.getSerieFavoris()
    this.getSerieAVoir();

  }

  navigateBack() {
    this.navCtrl.back();
  }

  getSerieDetail() {
    this.serieService.getSerieDetail(this.serieID).subscribe(d => {
      this.serie = d;
    });
  }

  getSerieCredit() {
    this.serieService.getSerieCredit(this.serieID).subscribe(d => {
      this.castList = d ;
    });
  }

  getSimilarSeries(){
    this.serieService.getSimilarSerie(this.serieID).subscribe(d => {
      this.similarSeries = d;
    })
  }

  ajoutSerieFavoris() {

    this.listeService.ajoutContenu(this.serieID, this.serie.name, this.serie.poster_path, "SerieFavoris");
  }

  ajoutSerieAVoir() {

    this.listeService.ajoutContenu(this.serieID, this.serie.name, this.serie.poster_path, "SerieVoir");
  }

  deleteSerieFavoris() {

    this.listeService.delete(this.serieID, "SerieFavoris");
  }

  deleteSerieAVoir() {

    this.listeService.delete(this.serieID, "SerieVoir");
  }

  /* ok */
  getSerieFavoris() {

    this.listeService.getContenu("SerieFavoris").valueChanges().subscribe((values) => {
      // If you want to push in values, however this may lead to duplicates
      values.forEach((value) =>
        this.listeSerieFavoris = value,

      );

      // If you want Moniteurs to be just the new data

      this.listeSerieFavoris = values;
    });
  }

  getSerieAVoir() {

    this.listeService.getContenu("SerieVoir").valueChanges().subscribe((values) => {
      // If you want to push in values, however this may lead to duplicates
      values.forEach((value) =>
        this.listeSerieAVoir = value,

      );

      this.listeSerieAVoir = values;

    });
  }

  getCompareSerieFavoris(): boolean {

    for (let element of this.listeSerieFavoris) {

      if (this.serieID == element.id_coucou) {

        return true;
      }
    }

    return false;

  }

  getCompareSerieEnvie(): boolean {

    for (let element of this.listeSerieAVoir) {

      if (this.serieID == element.id_coucou) {
        return true;
      }
    }

    return false;

  }

  message() {
    alert("Cette fonctionnalité n'est pas encore disponible");
  }


}
