import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class AppErrorInterceptor implements HttpInterceptor{

    constructor(public toasterService: ToastrService) {

    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(evt => {
            
            }),
            catchError((err: any) => {
                console.log(req);
                this.toasterService.error(err.error.description);
                return of(err);
            }));
    
      }
      

}
