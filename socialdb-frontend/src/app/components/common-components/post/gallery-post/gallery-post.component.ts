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
    public carouselArray: Array<{ url: string, active: boolean }>;

    public position = 0;
    public maxImages = 0;

    public leftControlEnabled: boolean = false;
    public rightControlEnabled: boolean = true;

    constructor() {
        super();
        this.mediaType = Constants.MEDIA_TYPE_GALLERY;
    }

    ngOnInit(): void {
        this.carouselArray = new Array();
        Object.values(this.postData.media_metadata).forEach(element => this.carouselArray.push({ url: (element.s.u as string).replaceAll('amp;', ''), active: false }));
        this.maxImages = this.carouselArray.length;
        console.log(this.carouselArray)
        this.carouselArray[0].active = true;
    }

    loadImage(id: number) {
        if (this.imageContainer.nativeElement.scrollHeight > 500) {
            this.carouselImageHeightsArray.push({ id: id, baseHeigh: this.imageContainer.nativeElement.scrollHeight })
        }
    }

    calculateImageDimensions(id: number) {
        let entry = this.carouselImageHeightsArray.filter(e => id === e.id)[0]
        if (entry.baseHeigh >= 500) {
            if (!this.loaded) {
                this.loaded = true;
                this.baseClass = '';
            } else {
                this.loaded = false;
                this.baseClass = 'post-media-container';
            }
        }
    }

    controlButtons(next: number) {
        this.carouselArray[this.position].active = false;
        this.position += next;
        this.carouselArray[this.position].active = true;

        if (this.position === 0) {
            this.leftControlEnabled = false;
        } else if (this.position === (this.maxImages - 1)) {
            this.rightControlEnabled = false;
        } else {
            this.leftControlEnabled = true;
            this.rightControlEnabled = true;
        }
    }

}
