/* Core */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

/* Models */
import { Movie, MovieResponse } from 'src/app/models/movie';
import { Cast, CreditResponse } from 'src/app/models/credit';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  constructor(private http: HttpClient) {
  }


  getLatestMovies(pageNumber: number): Observable<Movie[]> {
    var queryParams = {
      language: "fr",
      page: pageNumber.toString()
    }
    return this.http.get("/movie/latest", { params: queryParams }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }


  getPopularMovies(pageNumber: number): Observable<Movie[]> {
    var queryParams = {
      language: "fr",
      region : "fr",
      page: pageNumber.toString()
    }
    return this.http.get("/movie/popular", { params: queryParams }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }

  getTopRatedMovies(pageNumber: number): Observable<Movie[]> {
    var queryParams = {
      language: "fr",
      region : "fr",
      page: pageNumber.toString()
    }
    return this.http.get("/movie/top_rated", { params: queryParams }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }

  getTopUpcomingMovies(pageNumber: number): Observable<Movie[]> {
    var queryParams = {
      language: "fr",
      region : "fr",
      page: pageNumber.toString(),
      
    }
    return this.http.get("/movie/upcoming", { params: queryParams }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }

  getTopNowPlayingMovies(pageNumber: number): Observable<Movie[]> {
    var queryParams = {
      language: "fr",
      region: "fr",
      page: pageNumber.toString()
    }
    return this.http.get("/movie/now_playing", { params: queryParams }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }

  searchMovie(searchText: string): Observable<Movie[]> {
    var queryParams = {
      query: searchText,
      language: "fr"
    }

    return this.http.get("/search/movie", { params: queryParams }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      }),
      catchError(err => { 
        console.log(err);
        return throwError("err");
      })
      //catchError(err => of([]))
    );
  }

  getMovieDetail(movieID: string): Observable<Movie> {
    var queryParams: any = {
      language: "fr",
    }
    return this.http.get("/movie/" + movieID, {params: queryParams}).pipe(
      map((response: Movie) => {
        return response;
      })
    );
  }

  getMovieCredit(movieID: string): Observable<Cast[]> {
    let url = '/movie/' + movieID + '/credits';
    return this.http.get(url).pipe(
      map((response: CreditResponse) => {
        return response.cast;
      })
    );
  }

  getSimilarMovies(movieID: string): Observable<Movie[]> {
    var queryParams: any = {
      language: "fr",
    }
    let url = '/movie/' + movieID + '/similar';
    return this.http.get(url, { params: queryParams }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }
}
