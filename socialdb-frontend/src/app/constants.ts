import { environment } from "src/environments/environment";

export class Constants {

    public static CSRF_COOKIE_NAME = 'XSRF-TOKEN';
    public static CSRF_HEADER_NAME = 'X-XSRF-TOKEN';

    public static HOST = environment.host;
    public static API_AUTHORIZE = 'oauth2/authz/reddit';
    public static BACKEND_BASE_URL = 'http://localhost:8080/';
    public static BACKEND_API_USER_URL = 'api/user/';
    public static BACKEND_API_POST_URL = 'api/post/';

    public static LANGUAGE_SPANISH = 'es';
    public static LANGUAGE_ENGLISH = 'en';

    public static REDDIT_POST_HINT_HOSTED_VIDEO = 'hosted:video';
    public static REDDIT_POST_HINT_RICH_VIDEO = 'rich:video';
    public static REDDIT_POST_HINT_LINK = 'link';
    public static REDDIT_POST_HINT_IMAGE = 'image';

    public static MEDIA_TYPE_VIDEO = 'video';
    public static MEDIA_TYPE_IFRAME = 'iframe';
    public static MEDIA_TYPE_IMAGE = 'image';
    public static MEDIA_TYPE_GALLERY = 'gallery';
    public static MEDIA_TYPE_LINK = 'link';
    public static MEDIA_TYPE_NO_CONTENT = 'no_content';

    public static MEDIA_TYPE_GIFV = '.gifv';
    public static MEDIA_TYPE_MP4 = '.mp4';

    public static MAX_COLLAPSED_IMAGE_HEIGHT = 500;
    
}