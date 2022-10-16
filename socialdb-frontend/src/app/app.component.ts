import { Component } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { Constants } from './constants';
import { Globals } from './globals';
import { TranslateService } from '@ngx-translate/core';
import { RedditPost } from 'src/interfaces/reddit/post.reddit';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXLogger } from 'ngx-logger';
import { PostService } from 'src/service/post.service';

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
    public getPostDone: boolean = false;
    public loading: boolean = false
    public post: RedditPost;

    public postId: string = '';

    constructor(
        private userService: UserService,
        private postService: PostService,
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
        if (this.postId !== '') {
            this.getPostDone = false;
            this.loading = true;
            this.spinner.show();
            this.postService.getPost(this.postId).subscribe({
                next: (response) => {
                    if (response.status === 200) {
                        let postData = response.body.data.children[0].data;
                        this.post = { ...postData, internalType: Globals.getPostType(postData) };
                        this.getPostDone = true;
                        this.loading = false;
                    }
                },
                error: (error) => {
                    this.logger.error("Error in AppComponent.loadData(): ", error);
                    this.spinner.hide();
                },
                complete: () => {
                    this.logger.info("Request AppComponent.loadData() completed")
                    this.spinner.hide();
                }
            })
        }
    }

}
