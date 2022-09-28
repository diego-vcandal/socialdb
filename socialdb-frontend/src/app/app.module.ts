import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Globals } from './globals';
import { RouterModule } from '@angular/router';
import { Constants } from './constants';
import { CRSFInterceptorService } from 'src/service/csrf-interceptor.service';

import { HeaderComponent } from './components/base-components/header/header.component';
import { PostComponent } from './components/common-components/post/post.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PostComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        HttpClientXsrfModule.withOptions({
            cookieName: Constants.CSRF_COOKIE_NAME,
            headerName: Constants.CSRF_HEADER_NAME,
        })
    ],
    providers: [
        Globals,
        { provide: APP_BASE_HREF, useValue: '/socialdb' },
        { provide: HTTP_INTERCEPTORS, useClass: CRSFInterceptorService, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
