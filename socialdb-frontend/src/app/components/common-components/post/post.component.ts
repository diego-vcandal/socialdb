import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RedditOembed } from 'src/interfaces/reddit/oembed.reddit';
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
    public allow: string = '';

    public carouselArray: Array<string>;

    public videoControls: boolean;

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

        if (this.postData.post_hint && this.postData.post_hint === 'hosted:video') {

            this.mediaType = 'video';
            this.videoUrl = this.postData.secure_media.reddit_video.fallback_url
            this.videoControls = true;

        } else if (this.postData.url.endsWith('.gifv')) {
            this.mediaType = 'video';
            this.videoUrl = this.postData.url.replace('.gifv', '.mp4');

        } else if ((this.postData.post_hint && this.postData.post_hint === 'rich:video') ||
            (this.postData.preview && this.postData.preview.reddit_video_preview)) {

            this.mediaType = 'iframe';
            let splittedUrl = this.postData.url.split('/');
            let url = 'https://' + this.postData.domain + '/ifr/' + splittedUrl[splittedUrl.length - 1];

            if (this.postData.secure_media) {
                this.safeUrl = this.domSanitazer.bypassSecurityTrustResourceUrl(this.loadIframeData(this.postData.secure_media.oembed, url, this.postData.secure_media.type));
            } else {
                this.safeUrl = this.domSanitazer.bypassSecurityTrustResourceUrl(this.loadIframeData(this.postData.preview.reddit_video_preview, url, ''));
            }

        } else if (this.postData.is_gallery) {
            this.carouselArray = new Array<string>;
            Object.values(this.postData.media_metadata).forEach(element => this.carouselArray.push((element.s.u as string).replaceAll('amp;', '')))
            this.mediaType = 'carousel';

        } else if (this.postData.post_hint && this.postData.post_hint === 'link') {
            this.mediaType = 'link';

        } else if (this.postData.post_hint && this.postData.post_hint === 'image') {
            this.mediaType = 'image';
            
        } else {
            this.mediaType = 'no_content';
        }

    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        if (this.width !== '100%') {
            this.resizeIframe();
        }
    }

    private loadIframeData(oembed: RedditOembed, url: string, type: string): string {
        let newUrl = url;

        this.aspectRatio = oembed.height / oembed.width;
        this.iframeStyle = '';

        if (type === 'youtube.com') {
            url = 'https://www.youtube.com/embed/' + this.postData.url.split('watch?v=')[1]
            this.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        } else {
            this.width = oembed.width.toString();
            this.height = oembed.height.toString();
        }

        return newUrl;
    }


    private resizeIframe() {
        if (this.iframeContainer) {
            this.height = (this.aspectRatio * this.iframeContainer.nativeElement.offsetWidth).toString();
        }
    }

}
