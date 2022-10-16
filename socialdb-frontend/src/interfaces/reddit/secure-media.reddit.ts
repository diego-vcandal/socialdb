import { RedditOembed } from "./oembed.reddit";
import { RedditVideo } from "./reddit-video";

export interface RedditSecureMedia {
    oembed: RedditOembed
    reddit_video: RedditVideo
    type: string
}