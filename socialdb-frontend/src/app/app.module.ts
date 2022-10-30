import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Globals } from './globals';
import { RouterModule } from '@angular/router';
import { Constants } from './constants';
import { CRSFInterceptorService } from 'src/service/csrf-interceptor.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/base-components/header/header.component';
import { ImagePostComponent } from './components/common-components/post/image-post/image-post.component';
import { GalleryPostComponent } from './components/common-components/post/gallery-post/gallery-post.component';
import { IframePostComponent } from './components/common-components/post/iframe-post/iframe-post.component';
import { VideoPostComponent } from './components/common-components/post/video-post/video-post.component';
import { DefaultPostComponent } from './components/common-components/post/default-post/default-post.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomSpinnerComponent } from './components/common-components/custom-spinner/custom-spinner.component';
import { LoggerModule } from 'ngx-logger';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { VoteComponent } from './components/common-components/post-commons/vote/vote.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PostInfoComponent } from './components/common-components/post-commons/post-info/post-info.component';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ImagePostComponent,
        GalleryPostComponent,
        IframePostComponent,
        VideoPostComponent,
        DefaultPostComponent,
        CustomSpinnerComponent,
        VoteComponent,
        PostInfoComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        HttpClientXsrfModule.withOptions({
            cookieName: Constants.CSRF_COOKIE_NAME,
            headerName: Constants.CSRF_HEADER_NAME,
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgxSpinnerModule,
        BrowserAnimationsModule,
        CommonModule,
        LoggerModule.forRoot({
            level: environment.logLevel,
            disableConsoleLogging: environment.disableConsoleLogs
        }),
        FormsModule,
        AngularSvgIconModule.forRoot()
    ],
    exports: [
        NgxSpinnerModule
    ],
    providers: [
        Globals,
        { provide: APP_BASE_HREF, useValue: '/socialdb' },
        { provide: HTTP_INTERCEPTORS, useClass: CRSFInterceptorService, multi: true }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
