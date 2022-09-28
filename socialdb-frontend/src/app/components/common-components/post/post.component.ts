import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RedditPost } from 'src/interfaces/reddit/post.reddit';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    @Input() postData: RedditPost;

    public mediaType: string;
    public safeUrl: SafeUrl;
    public videoUrl: string;

    @ViewChild('iframeContainer') iframeContainer: ElementRef;

    public height: string = '100%';
    public width: string = '100%';
    public iframeStyle: string = 'position:relative; padding-bottom:calc(100% + 200px)';
    public aspectRatio: number = 0;

    public carouselArray: Array<string>;

    constructor(
        private domSanitazer: DomSanitizer
    ) { }

    ngOnInit(): void {
        this.getType();
        //console.log(this.postData)
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.resizeIframe();
        }, 0);
    }

    private getType() {

        if (this.postData.is_video) {

            this.mediaType = 'video';
            this.videoUrl = this.postData.secure_media.reddit_video.fallback_url

        } else if (this.postData.post_hint === 'rich:video') {

            this.mediaType = 'iframe';
            let splittedUrl = this.postData.url.split('/');
            this.safeUrl = this.domSanitazer.bypassSecurityTrustResourceUrl('https://' + this.postData.domain + '/ifr/' + splittedUrl[splittedUrl.length - 1]);

            if (this.postData.secure_media) {
                this.height = this.postData.secure_media.oembed.height.toString();
                this.width = this.postData.secure_media.oembed.width.toString();
                this.aspectRatio = this.postData.secure_media.oembed.height / this.postData.secure_media.oembed.width;
                this.iframeStyle = '';
            }

        } else if (this.postData.is_gallery) {
            this.carouselArray = new Array<string>;
            Object.values(this.postData.media_metadata).forEach(element => this.carouselArray.push((element.s.u as string).replaceAll('amp;', '')))
            console.log(this.carouselArray)
            this.mediaType = 'carousel';
        } else {
            this.mediaType = 'image';
        }

    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.resizeIframe();
    }

    private resizeIframe() {
        if (this.iframeContainer) {
            this.height = (this.aspectRatio * this.iframeContainer.nativeElement.offsetWidth).toString();
        }
    }

}
