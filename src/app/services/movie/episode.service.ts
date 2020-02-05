/* Core */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

/* Models */
import { Episode, EpisodeResponse } from 'src/app/models/series/episode';

@Injectable({
    providedIn: 'root'
})
export class SerieService {

    constructor(private http: HttpClient) {
    }

}