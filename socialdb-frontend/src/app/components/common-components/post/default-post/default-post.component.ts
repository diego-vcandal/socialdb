import { Component } from '@angular/core';
import { Constants } from 'src/app/constants';
import { ParentPostComponent } from '../parent-post.component';

@Component({
    selector: 'app-default-post',
    templateUrl: './default-post.component.html',
    styleUrls: ['./default-post.component.scss', '../parent-post.component.scss']
})
export class DefaultPostComponent extends ParentPostComponent {

    constructor() {
        super();
    }

    ngOnInit(): void {
        if (this.postData.post_hint === Constants.REDDIT_POST_HINT_LINK) {
            this.mediaType = Constants.MEDIA_TYPE_LINK;
        } else {
            this.mediaType = Constants.MEDIA_TYPE_NO_CONTENT;
        }
    }

}
