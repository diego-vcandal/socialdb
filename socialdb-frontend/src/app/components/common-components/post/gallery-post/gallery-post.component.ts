import { Component, ElementRef, ViewChild } from '@angular/core';
import { Constants } from 'src/app/constants';
import { ParentPostComponent } from '../parent-post.component';

@Component({
    selector: 'app-gallery-post',
    templateUrl: './gallery-post.component.html',
    styleUrls: ['./gallery-post.component.css', '../parent-post.component.css']
})
export class GalleryPostComponent extends ParentPostComponent {

    @ViewChild('imageContainer') override imageContainer: ElementRef;

    public carouselImageHeightsArray: Array<any> = new Array<any>;
    public carouselArray: Array<string>;

    constructor() {
        super();
        this.mediaType = Constants.MEDIA_TYPE_GALLERY;
    }

    ngOnInit(): void {
        this.carouselArray = new Array<string>;
        Object.values(this.postData.media_metadata).forEach(element => this.carouselArray.push((element.s.u as string).replaceAll('amp;', '')))
    }

    loadImage(id: number) {
        if (this.imageContainer.nativeElement.scrollHeight > 300) {
            this.carouselImageHeightsArray.push({ id: id, baseHeigh: this.imageContainer.nativeElement.scrollHeight })
        }
    }

    calculateImageDimensions(id: number) {
        let entry = this.carouselImageHeightsArray.filter(e => id === e.id)[0]
        if (entry.baseHeigh >= 300) {
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
