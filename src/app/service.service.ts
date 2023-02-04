import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient,  private router: Router,private toastr: ToastrService) {
   }
  HostURL=environment.hostULR
  RegisterURL= environment.RegisterURL;
  type:any=1
//Every 12 A.M logout automatically
   currentDate = new Date();
   startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 0, 0, 0);
   endDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()+1, 0, 0, 0);
   timeDiff = this.endDate.getTime() - this.currentDate.getTime();

  register(data:any){
    return this.http.post<any>(this.RegisterURL, data);
  }
 
  logIn(url:any,data: any) {
    this.isLoggedIn.next(true);
    return this.http
      .post<any>(url, data, { observe: 'response' })
      .subscribe({
        next: (result) => {
          if (result.body.statusCode === 200) {
            this.isLoggedIn.next(true);
            localStorage.setItem('jwt', JSON.stringify(result.body));
            localStorage.setItem('userPermissions',JSON.stringify(result.body.data.adminDetails?.role.role_permissions));
            localStorage.setItem('type',this.type)
            this.toastr.success('Logged In Successfully.', result.body.message);
            setTimeout(() => {
              this.router.navigate(['dashboard']);
              //This is for every 12 A.M automatically logout
              // setTimeout(() => {
              //   localStorage.removeItem('jwt');
              //   this.router.navigate(['']);
              // }, this.timeDiff)
            }, 100,
           );
            
          }
        },
        error: (error) => {
          // if (error.error.statusCode === 400) {
            this.toastr.error(error);
          // }
        },
      });
  }

  logoutuser(url:any){
    const token: any = localStorage.getItem('jwt');
    const accessToken: any = JSON.parse(token);
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken.data.accessToken);
    return this.http.get(url, {headers: headers});
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
// Get detail by id
  getById(url:any){
    return this.http.get(url);
  }
//Get all record
  getAll(url:any){
    return this.http.get(url);
  }
// Add API
  add(url:any,data:any){
    return this.http.post(url,data);
  }
// Delete API
  delete(url:any,id:any){
    const options = {
      body: id,
    };
    return this.http.delete(url, options);
  }
//Edit API
  edit(url:any,data:any){
    return this.http.put(url,data);
  }
//Get by Params
  getByParams(URL:any,params:any){
    return this.http.get(URL, {params: params});
  }
}
 