import { Component, OnInit } from '@angular/core';

import { IonInfiniteScroll } from "@ionic/angular";

/* Models */
import { Serie } from "src/app/models/series/serie";

/* Services */
import { SerieService } from "src/app/services/movie/serie.service";

@Component({
  selector: 'app-tabSerie',
  templateUrl: 'tabSerie.page.html',
  styleUrls: ['tabSerie.page.scss']
})
export class TabSerie implements OnInit {

  popularSerieList: Serie[] = [];
  bestSerieList: Serie[] = [];
  upcomingSerieList: Serie[] = [];
  diffusionOjdSerieList: Serie[] = [];
  pageCount: number = 1;
  isDataLoaded: boolean = false;

  constructor(private serieService: SerieService) { }

  ngOnInit(): void {
    this.getPopularSeries(1);
    this.getBestSeries(1);
    this.getUpcomingSeries(1);
    this.getDiffusionSerieOjdList(1);
  }

  private getDiffusionSerieOjdList(pageNumber: number){
    this.isDataLoaded = false;
    this.serieService.getDiffuseAujourdhuiSerieList(pageNumber).subscribe(serieResponse => {
      this.diffusionOjdSerieList = this.diffusionOjdSerieList.concat(serieResponse);
      // this.infiniteScroll.complete();
      this.isDataLoaded = true;
    });
  }

  private getPopularSeries(pageNumber: number) {
    this.isDataLoaded = false;
    this.serieService.getPopularSerie(pageNumber).subscribe(serieResponse => {
      this.popularSerieList = this.popularSerieList.concat(serieResponse);
      // this.infiniteScroll.complete();
      this.isDataLoaded = true;
    });
  }

  private getBestSeries(pageNumber: number) {
    this.isDataLoaded = false;
    this.serieService.getTopRatedSerie(pageNumber).subscribe(SerieResponse => {
      this.bestSerieList = this.bestSerieList.concat(SerieResponse);
      // this.infiniteScroll.complete();
      this.isDataLoaded = true;
    });
  }

  private getUpcomingSeries(pageNumber: number) {
    this.isDataLoaded = false;
    this.serieService.getTopUpcomingSerie(pageNumber).subscribe(SerieResponse => {
      this.upcomingSerieList = this.upcomingSerieList.concat(SerieResponse);
      // this.infiniteScroll.complete();
      this.isDataLoaded = true;
    });
  }

}

