import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms"
import { ServiceService } from '../../service.service'
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {

  constructor(private api: ServiceService,private router: Router) { }

  ngOnInit(): void {
  }
  getdata(data:NgForm){
    console.log(data,"data value") 
    this.api.logIn(data).subscribe({

   next:(res)=>{
    console.warn("This is res",res)
    // this.toastr.success('Logged in successfull');
    console.log("this is res",res)
    localStorage.setItem("token",JSON.stringify(res))
    // storedResponse:any = JSON.parse(localStorage.getItem('token'));
    const token1=localStorage.getItem('token')
    console.log("this is token1------------>",token1)
    this.router.navigate(['/dashboard']);

   },
   
   error:(err)=>{
    console.log("This is error",err) 
   }
    })
  }

}
