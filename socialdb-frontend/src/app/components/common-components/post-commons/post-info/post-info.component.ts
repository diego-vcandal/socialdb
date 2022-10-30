import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants';
import { PostControls } from 'src/interfaces/post-controls';
import { RedditPost } from 'src/interfaces/reddit/post.reddit';

@Component({
    selector: 'app-post-info',
    templateUrl: './post-info.component.html',
    styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit {

    @Input() postData: RedditPost;
    @Input() controls: PostControls;

    public formattedTitle: String;
    public formattedUrl: String;

    public expanded: String;

    constructor() { }

    ngOnInit(): void {
        this.formattedTitle = this.postData.title.length > Constants.MAX_TITLE_LENGTH ? this.postData.title.substring(0, Constants.MAX_TITLE_LENGTH) + "..." : this.postData.title;
        if (this.postData.url) {
            console.log(this.postData.url.replace("http(s?):\/\/", ""))
            this.formattedUrl = this.postData.url.replace(/(^\w+:|^)\/\//, '');
            this.formattedUrl = this.formattedUrl.substring(0, this.formattedUrl.indexOf("/") + 10) + "...";
        }
    }

    expand() {
        console.log("expand")
        this.controls.isHiddenContent = false;
        if (!this.controls.open) {
            this.controls.open = true;
        }
    }

    collapse() {
        console.log("collapse")
        this.controls.isHiddenContent = true;
    }

}
