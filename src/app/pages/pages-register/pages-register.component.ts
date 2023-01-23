import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms"
import { ServiceService } from '../../service.service'
// import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class PagesRegisterComponent implements OnInit {

  constructor(private api: ServiceService) { }

  ngOnInit(): void {
  }
  getdata(data:NgForm){
    console.log(data,"data value") 
    this.api.register(data).subscribe({

   next:(res)=>{
    console.log("This is res",res)
    // this.toastr.success('Hello world!', 'Toastr fun!');
   },
   error:(err)=>{
    console.log("This is error",err)
   }
    })
  }

}
