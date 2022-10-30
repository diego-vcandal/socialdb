import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Globals } from 'src/app/globals';

import { PostControls } from 'src/interfaces/post-controls';
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

    public controls: PostControls = { isHiddenContent: true, loaded: false, open: false };

    constructor() { }

    openUrl() {
        window.open(this.postData.url, '_blank');
    }

    showContent() {
        if (!this.controls.isHiddenContent) {
            this.controls.isHiddenContent = true;
        } else {
            this.controls.isHiddenContent = false;
            if (!this.controls.open) {
                this.controls.open = true;
            }
        }
    }

    preparePostData() {
        this.postData.title = Globals.htmlDecode(this.postData.title);
    }

}
