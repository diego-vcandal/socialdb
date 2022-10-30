import { RedditIdentity } from "src/interfaces/reddit/identity.reddit";
import { RedditPost } from "src/interfaces/reddit/post.reddit";
import { Constants } from "./constants";

export class Globals {

    public redditIdentity: RedditIdentity | null;
    public authorized: boolean = false;
    public userLanguage: string = Constants.LANGUAGE_ENGLISH;

    public static getPostType(post: RedditPost): string {

        if (post.url.endsWith('.gifv') || (post.post_hint && post.post_hint === Constants.REDDIT_POST_HINT_HOSTED_VIDEO)) {
            return Constants.MEDIA_TYPE_VIDEO;

        } else if ((post.post_hint && post.post_hint === Constants.REDDIT_POST_HINT_RICH_VIDEO) || (post.preview && post.preview.reddit_video_preview)) {
            return Constants.MEDIA_TYPE_IFRAME;

        } else if (post.is_gallery) {
            return Constants.MEDIA_TYPE_GALLERY;

        } else if (post.post_hint && post.post_hint === Constants.REDDIT_POST_HINT_LINK) {
            return Constants.MEDIA_TYPE_LINK;

        } else if (post.post_hint && post.post_hint === Constants.REDDIT_POST_HINT_IMAGE && post.url.match('\.redd.+\.gif$')) {
            return Constants.MEDIA_TYPE_VIDEO;

        } else if (post.post_hint && post.post_hint === Constants.REDDIT_POST_HINT_IMAGE) {
            return Constants.MEDIA_TYPE_IMAGE;
        }

        return Constants.MEDIA_TYPE_NO_CONTENT;

    }

    public static htmlDecode(input: string) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent ? doc.documentElement.textContent : "";
    }

}