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

    @ViewChild('imageContainer') imageContainer: ElementRef;
    @ViewChild('iframeContainer') iframeContainer: ElementRef;

    public iframeHeight: string = '100%';
    public iframeWidth: string = '100%';
    public iframeStyle: string = 'position:relative; padding-bottom:calc(100% + 200px)';
    public aspectRatio: number = 0;
    public allow: string = '';

    public carouselArray: Array<string>;

    public videoControls: boolean;

    public testclass: string = 'post-media-container';
    public open: boolean = false;
    public baseHeigh: number;

    public carouselTestArray: Array<any> = new Array<any>;
    public isHiddenContent: boolean = true;
    public loaded: boolean = false;

    constructor(
        private domSanitazer: DomSanitizer
    ) { }

    ngOnInit(): void {
        this.getType();
    }

    testCarga(id?: number) {

        if (this.mediaType === 'image') {
            if (this.imageContainer.nativeElement.scrollHeight > 300) {
                this.baseHeigh = this.imageContainer.nativeElement.scrollHeight;
            }
        } else if (this.mediaType === 'carousel') {
            if (this.imageContainer.nativeElement.scrollHeight > 300) {
                this.carouselTestArray.push({ id: id, baseHeigh: this.imageContainer.nativeElement.scrollHeight })
            }
        }
    }

    test(id?: number) {
        if (this.mediaType === 'image') {

            if (this.baseHeigh >= 300) {
                if (!this.open) {
                    this.open = true;
                    this.testclass = '';
                } else {
                    this.open = false;
                    this.testclass = 'post-media-container';
                }

            }
        } else if (this.mediaType === 'carousel') {
            let entry = this.carouselTestArray.filter(e => id === e.id)[0]
            if (entry.baseHeigh >= 300) {
                if (!this.open) {
                    this.open = true;
                    this.testclass = '';
                } else {
                    this.open = false;
                    this.testclass = 'post-media-container';
                }

            }
        }
    }

    showContent() {

        if (!this.isHiddenContent) {
            this.isHiddenContent = true;
        } else {
            this.isHiddenContent = false;
            if (!this.loaded) {
                this.loaded = true;

                setTimeout(() => {
                    this.resizeIframe();
                }, 0);
            }
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        if (this.mediaType === 'iframe' && this.iframeWidth !== '100%') {
            this.resizeIframe();
        }
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

    private loadIframeData(oembed: RedditOembed, url: string, type: string): string {
        let newUrl = url;
        this.aspectRatio = oembed.width / oembed.height;
        this.iframeStyle = '';

        if (type === 'youtube.com') {
            newUrl = 'https://www.youtube.com/embed/' + newUrl.split('watch?v=')[1]
            this.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        } else {
            this.iframeWidth = oembed.width.toString();
            this.iframeHeight = oembed.height.toString();
        }

        return newUrl;
    }

    private resizeIframe() {
        if (this.iframeContainer) {
            this.iframeHeight = ((this.iframeContainer.nativeElement.offsetWidth / this.aspectRatio) + (this.postData.url.includes('gfycat.com') ? 44 : 0)).toString();
        }
    }

}
