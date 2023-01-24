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
  users: any;
  constructor(private api: ServiceService,private router: Router) { 
  }

  ngOnInit(): void {
    this.api.reloadComponent();
  }
  getdata(data:NgForm){
    console.log(data,"data value") 
    this.api.logIn(data)
    }

}
