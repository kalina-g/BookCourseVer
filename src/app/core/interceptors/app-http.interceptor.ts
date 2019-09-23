import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_KEY = 'kid_ry5t98vKE';
const API_MASTER_SECRET = 'c2034e5988dc4ebd9ebe30abcd2e5f76';
const API_SECRET = 'ec52386f47b34c28ada03c7b65de88fa';
const API_URL = 'https://baas.kinvey.com';
export class AppHttpInterceptor implements HttpInterceptor {

    //fixing Kinvey levels of access in progress...
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers;
        if (req.url.endsWith('login') || (req.url.endsWith('register'))) {
            headers = new HttpHeaders({
                'Authorization': `Basic ${btoa(API_KEY + ':' + API_SECRET)}`
            });
            req.method
        } else if (req.params.get("isBasic") == "1") {
            headers = new HttpHeaders({
                'Authorization': `Basic ${btoa(API_KEY + ':' + API_SECRET)}`
            });
            req.method
        } else if (req.params.get("isBasic") == "2") {
            headers = new HttpHeaders({
                'Authorization': `Basic ${btoa(API_KEY + ':' + API_MASTER_SECRET)}`
            });
            req.method
        } else if ((req.url.endsWith('books/')) || (req.url.endsWith('sort={"addedToListTimes":-1}&limit=4')) || (req.url.endsWith('cart/'))) {
            headers = new HttpHeaders({
                'Authorization': `Basic ${btoa(API_KEY + ':' + API_MASTER_SECRET)}`
            });
        } else {
            headers = new HttpHeaders({
                'Authorization': 'Kinvey ' + localStorage.getItem('token')
            });
        }

        return next.handle(req.clone({
            headers: headers,
            url: API_URL + req.url
        }));
    }

}
