import { Component } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { Constants } from './constants';
import { Globals } from './globals';
import { TranslateService } from '@ngx-translate/core';
import { RedditPost } from 'src/interfaces/reddit/post.reddit';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public typeVideo = Constants.MEDIA_TYPE_VIDEO;
    public typeIframe = Constants.MEDIA_TYPE_IFRAME;
    public typeImage = Constants.MEDIA_TYPE_IMAGE;
    public typeGallery = Constants.MEDIA_TYPE_GALLERY;
    public typeLink = Constants.MEDIA_TYPE_LINK;
    public typeNoContent = Constants.MEDIA_TYPE_NO_CONTENT;

    private urlAuthorize = Constants.HOST + Constants.API_AUTHORIZE;
    public savedPostsDone: boolean = false;
    public savedPosts = new Array<RedditPost>;

    constructor(
        private userService: UserService,
        public globals: Globals,
        public translate: TranslateService,
        private spinner: NgxSpinnerService,
        private logger: NGXLogger
    ) {
        this.translate.setDefaultLang(Constants.LANGUAGE_ENGLISH);
        translate.use(this.globals.userLanguage);
    }

    ngOnInit() {
        this.getIdentity();
    }

    doAuthorize() {
        window.location.href = this.urlAuthorize;
    }

    doLogOut() {
        this.userService.logout().subscribe({
            next: (response) => {
                if (response.status === 204) {
                    window.location.reload();
                }
            },
            error: (error) => {
                this.logger.error("Error in AppComponent.logout(): ", error);
            },
            complete: () => this.logger.info("Request AppComponent.logout() completed")
        })
    }

    getIdentity() {
        this.userService.getIdentity().subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.globals.authorized = true;
                    this.globals.redditIdentity = response.body;
                    this.loadData();
                }
            },
            error: (error) => {
                if (error.status === 401) {
                    this.globals.authorized = false;
                }
            },
            complete: () => this.logger.info("Request AppComponent.getIdentity() completed")
        })
    }

    loadData() {
        if (this.globals.redditIdentity) {
            this.userService.getSavedPosts(this.globals.redditIdentity.name).subscribe({
                next: (response) => {
                    if (response.status === 200) {
                        response.body.data.children.forEach((post: any) => {
                            this.savedPosts.push({ ...post.data, internalType: Globals.getPostType(post.data) } as RedditPost);
                        });
                        this.spinner.hide();
                        this.savedPostsDone = true;

                    }
                },
                error: (error) => {
                    if (error.status === 401) {
                        this.logger.error("Error in AppComponent.getSavedPosts(): ", error);
                    }
                },
                complete: () => this.logger.info("Request AppComponent.getSavedPosts() completed")
            })
        }
    }

}
