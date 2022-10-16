import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Globals } from 'src/app/globals';
import { ServiceUtils } from './service-utils';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(
        public globals: Globals,
        private http: HttpClient,
    ) {
    }

    public getPost(postId: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(Constants.BACKEND_BASE_URL + Constants.BACKEND_API_POST_URL + postId, { headers: ServiceUtils.setHttpHeader(), withCredentials: true, observe: 'response' })
    }

}