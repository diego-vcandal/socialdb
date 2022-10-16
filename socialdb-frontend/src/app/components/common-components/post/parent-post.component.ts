import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RedditPost } from 'src/interfaces/reddit/post.reddit';

@Component({
    selector: 'app-parent-post',
    template: '',
    styleUrls: []
})
export abstract class ParentPostComponent {

    @Input() postData: RedditPost;

    public mediaType: string;

    @ViewChild('imageContainer') imageContainer: ElementRef;

    public baseClass: string = 'post-media-container';
    public baseHeigh: number;

    public isHiddenContent: boolean = true;
    public loaded: boolean = false;
    public open: boolean = false;

    constructor() {
    }

    openUrl() {
        window.open(this.postData.url, '_blank');
    }

    showContent() {
        if (!this.isHiddenContent) {
            this.isHiddenContent = true;
        } else {
            this.isHiddenContent = false;
            if (!this.open) {
                this.open = true;
            }
        }
    }

}
