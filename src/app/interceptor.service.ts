import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
// import { ClassGetter } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  HostURL=environment.hostULR
  LoginURL= environment.LoginURL;
  commanRoleURL=environment.commanRoleURL
  registerURL=environment.RegisterURL
  constructor(private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL------------------->:', req.url);
    if (req.url !== this.HostURL+this.LoginURL && req.url!== this.HostURL+this.commanRoleURL 
      && req.url !== this.HostURL+this.registerURL ) {
      console.log("Hellllllllllllllllllllllll")
      const token: any = localStorage.getItem('jwt');
      const accessToken: any = JSON.parse(token);
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken.data.accessToken);
      // Clone the request to add the new header
      const clonedRequest = req.clone({ headers: headers });
      // Pass the cloned request instead of the original request to the next handle
      return next.handle(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message);
          return throwError(error);
        })
      );
    }

    return next.handle(req);
  }
}
