import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Constants } from 'src/app/constants';
import { RedditOembed } from 'src/interfaces/reddit/oembed.reddit';
import { ParentPostComponent } from '../parent-post.component';

@Component({
    selector: 'app-iframe-post',
    templateUrl: './iframe-post.component.html',
    styleUrls: ['./iframe-post.component.css', '../parent-post.component.css']
})
export class IframePostComponent extends ParentPostComponent {

    @ViewChild('iframeContainer') iframeContainer: ElementRef;

    public safeUrl: SafeUrl;
    public iframeHeight: string = '100%';
    public iframeWidth: string = '100%';
    public aspectRatio: number = 0;
    public allow: string = '';

    constructor(private domSanitazer: DomSanitizer) {
        super();
        this.mediaType = Constants.MEDIA_TYPE_IFRAME;
    }

    ngOnInit(): void {
        let splittedUrl = this.postData.url.split('/');
        let url = 'https://' + this.postData.domain + '/ifr/' + splittedUrl[splittedUrl.length - 1];

        if (this.postData.secure_media) {
            this.safeUrl = this.domSanitazer.bypassSecurityTrustResourceUrl(this.loadIframeData(this.postData.secure_media.oembed, url, this.postData.secure_media.type));
        } else {
            this.safeUrl = this.domSanitazer.bypassSecurityTrustResourceUrl(this.loadIframeData(this.postData.preview.reddit_video_preview, url, ''));
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        if (this.mediaType === 'iframe' && this.iframeWidth !== '100%') {
            this.resizeIframe();
        }
    }

    override showContent() {

        if (!this.isHiddenContent) {
            this.isHiddenContent = true;
        } else {
            this.isHiddenContent = false;
            if (!this.open) {
                this.open = true;
                setTimeout(() => {
                    this.resizeIframe();
                }, 0);
            }
        }
    }

    private loadIframeData(oembed: RedditOembed, url: string, type: string): string {
        let newUrl = url;
        this.aspectRatio = oembed.width / oembed.height;

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
