import { Component, OnInit } from '@angular/core';
import { ListeService } from "src/app/services/liste.service"

@Component({
  selector: 'app-tabList',
  templateUrl: 'tabList.page.html',
  styleUrls: ['tabList.page.scss']
})


export class TabList implements OnInit {

  constructor(private listeService : ListeService) {}

  listeFilmFavoris: any;
  listeFilmAVoir: any;
  listeSerieFavoris: any;
  listeSerieAVoir: any;

  ngOnInit():void {
    this.getFilmFavoris();
    this.getFilmAVoir();
    this.getSerieFavoris();
    this.getSerieAVoir();
    
  }

  /* ok */
  getFilmFavoris(){
    console.log("Passage dans get film favoris")
    this.listeService.getContenu("FilmFavoris").valueChanges().subscribe((values) => {
      // If you want to push in values, however this may lead to duplicates
      values.forEach((value) => 
        this.listeFilmFavoris = value,
        
      );

      // If you want Moniteurs to be just the new data
      console.log(this.listeFilmFavoris)
      this.listeFilmFavoris = values;
    });
  }

  /* ok */
  getFilmAVoir() {

    this.listeService.getContenu("FilmAVoir").valueChanges().subscribe((values) => {
      // If you want to push in values, however this may lead to duplicates
      values.forEach((value) =>
        this.listeFilmAVoir = value,

      );

      // If you want Moniteurs to be just the new data
      console.log(this.listeFilmAVoir)
      this.listeFilmAVoir = values;
      console.log("Passage dans le GetFilmAVoir")
    });
  }

  /* ok */
  getSerieFavoris() {
    this.listeService.getContenu("SerieFavoris").valueChanges().subscribe((values) => {
      // If you want to push in values, however this may lead to duplicates
      values.forEach((value) =>
        this.listeSerieFavoris = value,

      );

      // If you want Moniteurs to be just the new data
      console.log(this.listeSerieFavoris)
      this.listeSerieFavoris = values;
    });
  }

  /* ok */
  getSerieAVoir() {
    this.listeService.getContenu("SerieAVoir").valueChanges().subscribe((values) => {
      // If you want to push in values, however this may lead to duplicates
      values.forEach((value) =>
        this.listeSerieAVoir = value,

      );

      // If you want Moniteurs to be just the new data
      console.log(this.listeSerieAVoir)
      this.listeSerieAVoir = values;
    });
  }

}
