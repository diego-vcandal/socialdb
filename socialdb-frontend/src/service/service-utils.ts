import { HttpHeaders } from "@angular/common/http";

export class ServiceUtils {

    public static setHttpHeader(contentType?: string): HttpHeaders {
        if (contentType) {
            return new HttpHeaders({
                'Content-Type': contentType
            });
        } else {
            return new HttpHeaders({
                'Content-Type': 'application/json'
            });
        }
    }

}