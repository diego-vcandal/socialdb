import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CRSFInterceptorService implements HttpInterceptor {

    constructor(
        private tokenExtractor: HttpXsrfTokenExtractor
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.method && (req.method === 'POST' || req.method === 'DELETE' || req.method === 'PUT')) {
            let token = this.tokenExtractor.getToken() as string;

            if (token !== null) {
                req = req.clone({ setHeaders: { "X-XSRF-TOKEN": token } });
            }
        }

        return next.handle(req);
    }

}