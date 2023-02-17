import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
  BusinessURL=environment.BusinessURL;
  dataMamber:any
  countUser:any
  countSubscriptionPlan:any
  countBusiness:any
  constructor(private elementRef: ElementRef,private api: ServiceService,
    private spinner:NgxSpinnerService) { 
    this.spinner.show()
  }
//For Stop uploading when all component render successfully
  ngAfterViewInit() {
    setTimeout(() => {
      this.spinner.hide();
    });
   }
  ngOnInit(): void {
    this.getDataUser()
    this.getDataSubscriptionPlan()
    this.getBusiness()
  }

  getDataUser(){
    let params = new HttpParams();
    params = params.set('limit', 1000); 
    params = params.set('skip', 0);
    this.api.getByParams(this.HostURL+this.UserULR,params).subscribe(data => {
      this.dataMamber=data
      this.countUser=this.dataMamber.data.count
    })
  }
  getDataSubscriptionPlan(){
    let params = new HttpParams();
    params = params.set('limit', 10);
    params = params.set('skip', 0);
    this.api.getByParams(this.HostURL+this.SubscriptionPlan,params).subscribe(data => {
      console.log("This is subscription plan data------->",data);
      this.dataMamber=data
      this.countSubscriptionPlan=this.dataMamber.data.length
      console.log("this is subscription plan dataMamaber--------->",this.dataMamber)
    })
  }
  getBusiness(){
    let params = new HttpParams();
    params = params.set('limit', 10); 
    params = params.set('skip', 0);
    this.api.getByParams(this.HostURL+this.BusinessURL,params).subscribe(data => {
      this.dataMamber=data
      this.countBusiness=this.dataMamber.data.count
    })
  }

}
