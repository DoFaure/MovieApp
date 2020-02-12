/* Core */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

/* Models */
import { Serie } from "src/app/models/series/serie";
import { Cast } from 'src/app/models/credit';

/* Services */
import { SerieService } from 'src/app/services/serie/serie.service'

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
    private serieService: SerieService ) {}

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

}
