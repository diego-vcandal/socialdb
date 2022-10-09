import { Component, ElementRef, ViewChild } from '@angular/core';
import { Constants } from 'src/app/constants';
import { ParentPostComponent } from '../parent-post.component';

@Component({
    selector: 'app-video-post',
    templateUrl: './video-post.component.html',
    styleUrls: ['./video-post.component.scss', '../parent-post.component.scss']
})
export class VideoPostComponent extends ParentPostComponent {

    public videoUrl: string;
    public videoControls: boolean;

    constructor() {
        super();
        this.mediaType = Constants.MEDIA_TYPE_VIDEO;
    }

    ngOnInit(): void {
        this.videoControls = true;

        if (this.postData.url.endsWith('.gifv')) {
            this.videoUrl = this.postData.url.replace('.gifv', '.mp4');
        } else {
            this.videoUrl = this.postData.secure_media.reddit_video.fallback_url
        }
    }

}