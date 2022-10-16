import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/constants';
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
        return this.http.get<RedditIdentity>(Constants.BACKEND_BASE_URL + Constants.BACKEND_API_USER_URL + "identity", { headers: ServiceUtils.setHttpHeader(), withCredentials: true, observe: 'response' })
    }

    public logout(): Observable<HttpResponse<any>> {
        return this.http.post<any>(Constants.BACKEND_BASE_URL + Constants.BACKEND_API_USER_URL + "logout", {}, { headers: ServiceUtils.setHttpHeader(), withCredentials: true, observe: 'response' })
    }

    public getSavedPosts(userName: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(Constants.BACKEND_BASE_URL + Constants.BACKEND_API_USER_URL + userName + "saved-posts", { headers: ServiceUtils.setHttpHeader(), withCredentials: true, observe: 'response' })
    }

}