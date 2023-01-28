import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,  private router: Router,private toastr: ToastrService) { }
  LoginURL= environment.LoginURL;
  RegisterURL= environment.RegisterURL;
//Every 12 A.M logout automatically
   currentDate = new Date();
   startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 0, 0, 0);
   endDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()+1, 0, 0, 0);
   timeDiff = this.endDate.getTime() - this.currentDate.getTime();

  register(data:any){
    return this.http.post<any>(this.RegisterURL, data);
  }
 
  logIn(data: any) {
    this.isLoggedIn.next(true);
    return this.http
      .post<any>(this.LoginURL, data, { observe: 'response' })
      .subscribe({
        next: (result) => {
          if (result.body.statusCode === 200) {
            this.isLoggedIn.next(true);
            localStorage.setItem('jwt', JSON.stringify(result.body));
            this.toastr.success('Logged In Successfully.', result.body.message);
            setTimeout(() => {
              this.router.navigate(['dashboard']);
              //This is for every 12 A.M automatically logout
              setTimeout(() => {
                localStorage.removeItem('jwt');
                this.router.navigate(['']);
              }, this.timeDiff)
            }, 100,
           );
            
          }
        },
        error: (error) => {
          if (error.error.statusCode === 400) {
            this.toastr.error(error.error.message);
          }
        },
      });
  }
  reloadComponent() {
    console.log('reload component hit');
    if (localStorage.getItem('jwt')) {
      this.router.navigate(['dashboard']);
      this.isLoggedIn.next(true);
    }
  }
  postProduct(data: any) {
    return this.http.post('http://localhost:3000/productList', data);
  }

  getProduct() {
    return this.http.get('http://localhost:3000/productList');
  }

  updateProduct(data: any, id: number) {
    return this.http.put('http://localhost:3000/productList/' + id, data);
  }

  deleteProduct(id: number) {
    return this.http.delete('http://localhost:3000/productList/' + id);
  }
}
 