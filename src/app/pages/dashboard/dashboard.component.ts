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
    this.spinner.show()
    let params = new HttpParams();
    params = params.set('limit', 1000); 
    params = params.set('skip', 0);
    this.api.getByParams(this.HostURL+this.UserULR,params).subscribe(data => {
      this.dataMamber=data
      this.countUser=this.dataMamber.data.count
      this.percentageUser=(this.countUser)/10
    })
  }
  getDataSubscriptionPlan(){
    this.spinner.show()
    let params = new HttpParams();
    params = params.set('limit', 10);
    params = params.set('skip', 0);
    this.api.getByParams(this.HostURL+this.SubscriptionPlan,params).subscribe(data => {
      console.log("This is subscription plan data------->",data);
      this.dataMamber=data
      this.countSubscriptionPlan=this.dataMamber.data.length
      this.percentage=this.countSubscriptionPlan
      console.log("this is subscription plan dataMamaber--------->",this.dataMamber)
    })
  }
  getBusiness(){
    this.spinner.show()
    let params = new HttpParams();
    params = params.set('limit', 10); 
    params = params.set('skip', 0);
    this.api.getByParams(this.HostURL+this.BusinessURL,params).subscribe(data => {
      this.dataMamber=data
      this.countBusiness=this.dataMamber.data.count
      this.percent=(this.countBusiness)/10;
    })
  }
//This is for business
  percent = 0;
  radius = 50;
  title = '';
  showTitle = true;
  showSubtitle = false;
  units = '%';
  showUnits = true;
  outerStrokeWidth = 16;
  innerStrokeWidth = 8;
  outerStrokeColor = '#78C000';
  innerStrokeColor = '#C7E596';
  animationDuration = 300;
  animation = true;
  responsive = true;
//This is for subscription plan
  toFixed=2;
  radiuss=100;
  percentage=0;
  percentageUser=0
}
