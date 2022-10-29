import { RedditPreview } from "./preview.reddit"
import { RedditSecureMedia } from "./secure-media.reddit"

export interface RedditPost {
    author: string
    author_fullname: string
    created: number
    domain: string
    id: string
    over_18: boolean
    permalink: string
    saved: boolean
    subreddit_name_prefixed: string
    title: string
    thumbnail: string
    url: string
    is_video: boolean
    post_hint: string
    secure_media: RedditSecureMedia
    is_gallery: boolean
    media_metadata: Object
    preview: RedditPreview
    internalType: string

    ups: number
    uppove_ratio: number
}