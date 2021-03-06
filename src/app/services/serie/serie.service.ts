/* Core */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

/* Models */
import { Serie, SerieResponse } from 'src/app/models/series/serie';
import { Cast, CreditResponse } from 'src/app/models/credit'

@Injectable({
    providedIn: 'root'
})
export class SerieService {

    constructor(private http: HttpClient) {
    }

    getDiffuseAujourdhuiSerieList(pageNumber: number): Observable<Serie[]> {
        var queryParams = {
            region: "fr",
            page: pageNumber.toString()
        }
        return this.http.get("/tv/airing_today", { params: queryParams }).pipe(
            map((response: SerieResponse) => {
                return response.results;
            })
        );
    }


    getPopularSerie(pageNumber: number): Observable<Serie[]> {
        var queryParams = {
            region: "fr",
            page: pageNumber.toString()
        }
        return this.http.get("/tv/popular", { params: queryParams }).pipe(
            map((response: SerieResponse) => {
                return response.results;
            })
        );
    }

    getTopRatedSerie(pageNumber: number): Observable<Serie[]> {
        var queryParams = {
            region: "fr",
            page: pageNumber.toString()
        }

        return this.http.get("/tv/top_rated", { params: queryParams }).pipe(
            map((response: SerieResponse) => {
                return response.results;
            })
        );
    }

    getTopUpcomingSerie(pageNumber: number): Observable<Serie[]> {
        var queryParams = {
            region: "fr",
            page: pageNumber.toString(),
        }

        return this.http.get("/tv/on_the_air", { params: queryParams }).pipe(
            map((response: SerieResponse) => {
                return response.results;
            })
        );
    }

    searchSerie(searchText: string): Observable<Serie[]> {
        var queryParams = {
            query: searchText,
            language: "fr"
        }

        return this.http.get("/search/tv", { params: queryParams }).pipe(
            map((response: SerieResponse) => {
                return response.results;
            }),
            catchError(err => {
                console.log(err);
                return throwError("err");
            })
            //catchError(err => of([]))
        );
    }

    getSerieDetail(serieID: string): Observable<Serie> {
        var queryParams: any = {
            language: "fr",
          }
        return this.http.get("/tv/" + serieID,{params: queryParams}).pipe(
            map((response: Serie) => {
                return response;
            })
        );
    }

    getSimilarSerie(serieID: string): Observable<Serie[]> {
        let url = '/tv/' + serieID + '/similar';
        return this.http.get(url).pipe(
            map((response: SerieResponse) => {
                return response.results;
            })
        );
    }

    getSerieCredit(movieID: string): Observable<Cast[]> {
        let url = '/tv/' + movieID + '/credits';
        return this.http.get(url).pipe(
          map((response: CreditResponse) => {
            return response.cast;
          })
        );
      }

    getCategorySerie(genderID: string, page: number): Observable<Serie[]> {
        var queryParams: any = {
            with_genres: genderID,
            page: page,
            language: "fr",
        }
        let url = '/discover/tv';
        return this.http.get(url, { params: queryParams }).pipe(
            map((response: SerieResponse) => {
                return response.results;
            })
        );
    }

}