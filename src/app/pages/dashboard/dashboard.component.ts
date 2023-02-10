import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  HostURL=environment.hostULR;
  UserULR=environment.UserUrl;
  SubscriptionPlan=environment.SubscriptionPlan;
  dataMamber:any
  counts:any
  constructor(private elementRef: ElementRef,private api: ServiceService) { }

  ngOnInit(): void {
    this.getDataUser()
    this.getDataSubscriptionPlan()
  }

  getDataUser(){
    let params = new HttpParams();
    params = params.set('limit', 1000); 
    params = params.set('skip', 0);
    this.api.getByParams(this.HostURL+this.UserULR,params).subscribe(data => {
      this.dataMamber=data
    })
  }
  getDataSubscriptionPlan(){
    let params = new HttpParams();
    params = params.set('limit', 10);
    params = params.set('skip', 0);
    this.api.getByParams(this.HostURL+this.SubscriptionPlan,params).subscribe(data => {
      console.log("This is subscription plan data------->",data);
      this.dataMamber=data
      this.counts=this.dataMamber.data.length
      console.log("this is subscription plan dataMamaber--------->",this.dataMamber)
    })
  }


}
