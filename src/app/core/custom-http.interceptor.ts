import { Injectable, Injector} from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({
			url: `${environment.baseUrl}${request.url}`,
			setParams: {
				api_key: "ab2fcb8c5fbd43a6f4f456a8ac195875"
			}
		});

        return next.handle(request); 
    }


}
