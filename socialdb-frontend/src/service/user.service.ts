import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/globals';
import { RedditIdentity } from 'src/interfaces/reddit/identity.reddit';
import { ServiceUtils } from './service-utils';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        public globals: Globals,
        private http: HttpClient,
    ) {
    }

    public getIdentity(): Observable<HttpResponse<RedditIdentity>> {
        return this.http.get<RedditIdentity>("http://localhost:8080/api/user/identity", { headers: ServiceUtils.setHttpHeader(), withCredentials: true, observe: 'response' })
    }

    public logout(): Observable<HttpResponse<any>> {
        return this.http.post<any>("http://localhost:8080/api/user/logout", {}, { headers: ServiceUtils.setHttpHeader(), withCredentials: true, observe: 'response' })
    }

}