import { Component } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { Constants } from './constants';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from './globals';
import { PostComponent } from './components/common-components/post/post.component';

// TODO: substituir console.log por logger

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'socialdb';

    private urlAuthorize = Constants.HOST + Constants.API_AUTHORIZE;
    public savedPostsDone: boolean = false;
    public savedPosts: Array<any>;

    constructor(
        private userService: UserService,
        private cookieService: CookieService,
        public globals: Globals,
    ) {
    }

    ngOnInit() {

        this.getIdentity();

        this.userService.getSavedPosts().subscribe({
            next: (response) => {
              if (response.status === 200) {
                console.log(response)
                this.savedPostsDone = true;
                this.savedPosts = response.body.data.children;
              }
            },
            error: (error) => {
              if (error.status === 401) {
                console.log(error)
              }
            },
            complete: () => console.log("Request AppComponent.getSavedPosts() completed")
          })
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
                console.log(error)
            },
            complete: () => console.log("Request AppComponent.logout() completed")
        })
    }

    getIdentity() {
        this.userService.getIdentity().subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.globals.authorized = true;
                    this.globals.redditIdentity = response.body;
                }
            },
            error: (error) => {
                if (error.status === 401) {
                    this.globals.authorized = false;
                }
            },
            complete: () => console.log("Request AppComponent.getIdentity() completed")
        })
    }

}
