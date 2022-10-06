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
import { ImagePostComponent } from './components/common-components/post/image-post/image-post.component';
import { GalleryPostComponent } from './components/common-components/post/gallery-post/gallery-post.component';
import { IframePostComponent } from './components/common-components/post/iframe-post/iframe-post.component';
import { VideoPostComponent } from './components/common-components/post/video-post/video-post.component';
import { DefaultPostComponent } from './components/common-components/post/default-post/default-post.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PostComponent,
        ImagePostComponent,
        GalleryPostComponent,
        IframePostComponent,
        VideoPostComponent,
        DefaultPostComponent
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
