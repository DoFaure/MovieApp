import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CustomErrorHandler implements ErrorHandler {

	constructor() { }

	handleError(error: Error | HttpErrorResponse) {

		if (error instanceof HttpErrorResponse) {
			console.log("Erreur serveur", error);

		} else {
			console.log("Erreur client :", error);
		}
		return error;
	}

}
