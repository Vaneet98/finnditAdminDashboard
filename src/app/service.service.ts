import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  logIn(data: any) {
    console.log("This is serc",data)
    return this.http.post('http://localhost:3000/admin/v1/admin/login', data);
  }
  register(data:any){
    return this.http.post('http://localhost:3000/admin/v1/admin', data);
  }
}
