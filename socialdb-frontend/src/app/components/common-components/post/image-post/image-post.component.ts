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

    ngOnInit(): void {
        this.preparePostData();
    }

    loadImage() {
        if (this.imageContainer && this.imageContainer.nativeElement.scrollHeight > Constants.MAX_COLLAPSED_IMAGE_HEIGHT) {
            this.baseHeigh = this.imageContainer.nativeElement.scrollHeight;
        }
    }

    calculateImageDimensions() {
        if (this.baseHeigh >= Constants.MAX_COLLAPSED_IMAGE_HEIGHT) {
            if (!this.controls.loaded) {
                this.controls.loaded = true;
                this.baseClass = '';
            } else {
                this.controls.loaded = false;
                this.baseClass = 'post-media-container';
            }
        }
    }

}
