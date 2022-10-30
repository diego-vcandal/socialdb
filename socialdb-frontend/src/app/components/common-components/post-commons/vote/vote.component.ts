import { Component, Input, OnInit } from '@angular/core';
import { RedditPost } from 'src/interfaces/reddit/post.reddit';

@Component({
    selector: 'app-vote',
    templateUrl: './vote.component.html',
    styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

    @Input() postData: RedditPost;

    constructor() { }

    ngOnInit(): void {
    }

    upvote() {
        console.log("upvote")
    }

    downvote() {
        console.log("downvote")
    }

}
