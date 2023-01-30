import { Component, OnInit,ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service'
import { PageEvent } from '@angular/material/paginator'
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css']
})
export class SubscriptionPlansComponent implements OnInit {
  subscriptionForm: FormGroup | any;
  constructor(private elementRef: ElementRef,private api: ServiceService ,
     private router:Router,private fb: FormBuilder,private toastr: ToastrService) { }
   form:FormGroup|any
  pagePerItem=0
  ngOnInit(): void {
    this.pagePerItem=5
    this.getData()
    this.subscriptionForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      validityLevel: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      validityDays: ['', Validators.required],
      paymentType: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      status: ['', Validators.required]
    });
  }

  // Get data from server
  dataMamber:any
  getData(){
    this.api.getSubscriptionPlan().subscribe(data => {
      console.log("This is subscription plan data------->",data);
      this.dataMamber=data
      console.log("this is subscription plan dataMamaber--------->",this.dataMamber.data)
    })
  }

  // This is for pagination 
  p = 1;
  searchText = '';
 loadDataPage(event: PageEvent) {
    this.pagePerItem=event.pageSize
}
//Get id of particalar field
subscriptionPlanId:any
getId(id:any){
this.subscriptionPlanId=id
// alert(this.subscriptionPlanId)
}
showrecord:any
name:any
paymentType:any
validityDays:any
status:any
getRecord(data:any){
  this.showrecord=data
 this.showrecord= JSON.parse(JSON.stringify(this.showrecord))
 console.log("This is getrecord showrecord data",this.showrecord)
 this.name=this.showrecord.name
 this.paymentType=this.showrecord.paymentType
this.validityDays=this.showrecord.validityDays
this.status=this.showrecord.status
  console.log("This is getrecord data",this.name)
}
//Add subscription Plan


//Get data for edit
statusVal:any
getdataForEditSubscriptionPlan(data:any){
    data.id=this.subscriptionPlanId
    console.log("This is edit subscritpion value details------>",data)
    if(data.id !== undefined){
      this.api.EditSubscriptionPlan(data).subscribe((val) => {
        console.log("This is respone from server side for edit the subsrcription plan",val)
        if (val) {
          this.statusVal=val
          if(this.statusVal.statusCode===200){
            this.toastr.success('Edit data Successfully.');
            this.getData();
          }
        }
      });
    }
    else{
      delete data.id
      this.api.AddSubscriptionPlan(data).subscribe((val) => {
        console.log("This is respone from server side for add the subsrcription plan",val)
        if (val) {
          this.statusVal=val
          if(this.statusVal.statusCode===200){
            this.toastr.success('Add data Successfully.');
            this.getData();
          }
        }
      });
    }
   
}
//This is for set value in edit filds
patchValue(data:any) {
  this.subscriptionForm.patchValue({
    name: data.name,
    description:data.description,
    validityLevel:data.validityLevel,
    validityDays:data.validityDays,
    paymentType:data.paymentType,
    price:data.price,
    status:data.status
  });
}


deleteData(){
  console.log("This is deleted",this.subscriptionPlanId)
  this.api.DeleteSubscriptionPlan(this.subscriptionPlanId).subscribe((val) => {
    console.log("This is respone from server side for edit the subsrcription plan",val)
    if (val) {
      this.statusVal=val
      if(this.statusVal.statusCode===200){
        this.toastr.success('Deleted data Successfully.');
        this.getData();
      }
    }
  });
 
}
publish:any

getdataForPublish(data:any){
  this.subscriptionPlanId=data.id
  this.publish=data.status
}
data:{id:any,status:any} | any
pusblishData(){
  console.log("This is Publish id",this.subscriptionPlanId)
  this.data = {
    id: this.subscriptionPlanId,
    status: this.publish === 1 ? 0 : 1
  };
  console.log("This is publish subscritpion value details------>",this.data)
  this.api.EditSubscriptionPlan(this.data).subscribe((val) => {
    console.log("This is respone from server side for edit the subsrcription plan",val)
    if (val) {
      this.statusVal=val
      if(this.statusVal.statusCode===200){
        this.toastr.success('Publish data Successfully.');
        this.getData();
      }
    }
  });
}

}
