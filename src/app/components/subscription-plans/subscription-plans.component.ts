import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service'
import { PageEvent } from '@angular/material/paginator'
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css']
})
export class SubscriptionPlansComponent implements OnInit {
  HostURL=environment.hostULR
  SubscriptionPlan=environment.SubscriptionPlan;
  SubscriptionPlanEdit=environment.SubscriptionPlanEdit;
  SubscriptionPlanDelete=environment.SubscriptionPlanDelete;
  subscriptionForm: FormGroup | any;
  condition: boolean | any

  constructor(private elementRef: ElementRef,private api: ServiceService ,private dialog: MatDialog,
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


  @ViewChild('closebutton') closebutton: any;

  public onSave() {
    this.closebutton.nativeElement.click();
  }

  // Get data from server
  dataMamber:any
  getData(){
    this.api.getAll(this.HostURL+this.SubscriptionPlan).subscribe(data => {
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


//Get data for edit and Add subscription Plan
statusVal:any
getdataForEditSubscriptionPlan(data:any){
    data.id=this.subscriptionPlanId
    console.log("This is edit subscritpion value details------>",data)
    if(data.id !== undefined){
      data.paymentType=parseInt(data.paymentType)
      data.status=parseInt(data.status)
      console.log("This is payment type details------>",data)
      this.api.edit(this.HostURL+this.SubscriptionPlanEdit,data).subscribe((val) => {
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
      this.api.add(this.HostURL+this.SubscriptionPlan,data).subscribe((val) => {
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
patchValue(data:any,num:number) {
  if(num===1){
    this.subscriptionForm.reset()
    this.subscriptionPlanId=undefined
  }else{
    this.subscriptionForm.patchValue({
      name: data.name !==undefined ? data.name : "",
      description:data.description !==undefined?data.description : "",
      validityLevel:data.validityLevel !== undefined ? data.validityLevel :"",
      validityDays:data.validityDays !==undefined ? data.validityDays : "",
      paymentType:data.paymentType !==undefined ? data.paymentType : "",
      price:data.price !==undefined ? data.price : "",
      status:data.status !==undefined ?data.status:"",
    });
  }
}


deleteSubscription(id: any) {
  const dialogRef = this.dialog.open(DeleteDialogComponent);
  const data = {
    "id": id
  }
  dialogRef.afterClosed().subscribe((result) => {
    console.log("This is result", result);
      if (result) {
        this.api.delete(this.HostURL+this.SubscriptionPlanDelete,data).subscribe({
          next: (res) => {
            console.log("This is result--------->",res)
            this.getData();
            this.toastr.success("Delete data Successfull.")
            console.log(res);
          },
          error: () => {
            this.toastr.error("Something went wrong in deletion")
          },
        });
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
  this.api.edit(this.HostURL+this.SubscriptionPlanEdit,this.data).subscribe((val) => {
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
