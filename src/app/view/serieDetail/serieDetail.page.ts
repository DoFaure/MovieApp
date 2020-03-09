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
    console.log("Passage dans Serie Favoris");
    this.listeService.ajoutContenu(this.serieID, this.serie.name, this.serie.poster_path, "SerieFavoris");
  }

  ajoutSerieAVoir() {
    console.log("Passage dans Serie A Voir");
    this.listeService.ajoutContenu(this.serieID, this.serie.name, this.serie.poster_path, "SerieVoir");
  }

  deleteSerieFavoris() {
    console.log("Passage dans Supression Serie Favoris");
    this.listeService.delete(this.serieID, "SerieFavoris");
  }

  deleteSerieAVoir() {
    console.log("Passage dans Supression Serie Favoris");
    this.listeService.delete(this.serieID, "SerieVoir");
  }

}
