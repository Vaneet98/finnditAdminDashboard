import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: any = localStorage.getItem('jwt');
    const accessToken: any = JSON.parse(token);
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken.data.accessToken);
    // Clone the request to add the new header
    const clonedRequest = req.clone({ headers: req.headers.set('headers', 'headers') });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
