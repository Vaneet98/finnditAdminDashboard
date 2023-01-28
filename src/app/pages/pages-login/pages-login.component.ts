import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms"
import { ServiceService } from '../../service.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {
  users: any;
  constructor(private api: ServiceService,private router: Router) { 
  }

  ngOnInit(): void {
    this.api.reloadComponent();
  }
  adminType:any
  getdata(data:any){
    console.log(data,"data value") 
    data.adminType="935e28c4-8bfe-11ed-a2f3-b03cdcf7fe7b"
    console.log("this is login id",data)
    this.api.logIn(data)
    }

}
