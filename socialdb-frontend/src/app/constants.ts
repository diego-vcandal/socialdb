import { environment } from "src/environments/environment";

export class Constants {

    public static CSRF_COOKIE_NAME = 'XSRF-TOKEN';
    public static CSRF_HEADER_NAME = 'X-XSRF-TOKEN';

    public static HOST = environment.host;
    public static API_AUTHORIZE = 'oauth2/authz/reddit';
    public static BACKEND_BASE_URL = 'localhost:8080/';
    public static BACKEND_API_USER_URL = 'api/user';

}