import { Component, ElementRef, ViewChild } from '@angular/core';
import { Constants } from 'src/app/constants';
import { ParentPostComponent } from '../parent-post.component';

@Component({
    selector: 'app-image-post',
    templateUrl: './image-post.component.html',
    styleUrls: ['./image-post.component.scss', '../parent-post.component.scss']
})
export class ImagePostComponent extends ParentPostComponent {

    @ViewChild('imageContainer') override imageContainer: ElementRef;

    constructor() {
        super();
        this.mediaType = Constants.MEDIA_TYPE_IMAGE;
    }

    loadImage() {
        if (this.imageContainer && this.imageContainer.nativeElement.scrollHeight > 300) {
            this.baseHeigh = this.imageContainer.nativeElement.scrollHeight;
        }
    }

    calculateImageDimensions() {
        if (this.baseHeigh >= 300) {
            if (!this.loaded) {
                this.loaded = true;
                this.baseClass = '';
            } else {
                this.loaded = false;
                this.baseClass = 'post-media-container';
            }
        }
    }

}
