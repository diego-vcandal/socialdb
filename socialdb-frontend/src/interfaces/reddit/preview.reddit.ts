import { ImagePreview } from "./image-preview.reddit";
import { RedditOembed } from "./oembed.reddit";

export interface RedditPreview {
    reddit_video_preview: RedditOembed
    images: Array<ImagePreview>
}