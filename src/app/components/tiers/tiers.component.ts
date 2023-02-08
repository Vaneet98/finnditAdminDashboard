import { Component, OnInit,ElementRef ,ViewChild} from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { HttpParams, HttpClient } from "@angular/common/http"
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from "@angular/router";
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tiers',
  templateUrl: './tiers.component.html',
  styleUrls: ['./tiers.component.css']
})
export class TiersComponent implements OnInit {
  HostURL=environment.hostULR
  HorizontalTierGetDetail=environment.HorizontalTierGetDetail;
  TagaddURL=environment.TagaddURL;
  TagAdminDetailURL=environment.TagAdminDetailURL;
  HorizontalTierDeactivate=environment.HorizontalTierDeactivate
  statusVal: any;
  tierForm: FormGroup | any;
  pagePerItem=0
  searchText = '';
  p = 1;
  dataMamber:any;
  dataMamaberMarchant:any
  tierId:any
  type:any=0
  editTag=false
  deleteTags=false
  addTag=false
  status:any
  typeOfTier:any=0
  constructor(private elementRef: ElementRef,private api: ServiceService,private dialog: MatDialog,
    private toastr: ToastrService,private fb: FormBuilder,private router: Router) { 

  }
  loadDataPage(event: PageEvent) {
    this.pagePerItem=event.pageSize
}

//This is for close the popup window
@ViewChild('closebutton') closebutton: any;

public onSave() {
  this.closebutton.nativeElement.click();
}

  ngOnInit(): void {
   this.pagePerItem=5
   this.getData()
   if(this.typeOfTier==0){
    this.tierForm = this.fb.group({
      // image: ['', Validators.required],
      tierTitle: ['', Validators.required],
      pointsRewarded: ['', Validators.required],
      pointMultiplier: ['', Validators.required],
      profileCompletion: ['', Validators.required],
      description: ['', Validators.required],
    });
   }
   else if(this.typeOfTier==1){
    this.tierForm=this.fb.group({
      tierTitle: ['', Validators.required],
      pointEarnedValidity: ['', Validators],
      maxPointEarningPerMonth: ['', Validators],
      maxPointRedeemedPerMonth: ['', Validators],
      redeemedPerTransaction: ['', Validators],
      minBlockRedeemedPerTransaction: ['', Validators],
      additionalRewards: ['', Validators],
    })
   }
 
  }
 
getData(){
  let params = new HttpParams();
  params = params.set('limit', 10);
  params = params.set('skip', 0);
  params = params.set('tierType', this.type.toString());
    this.api.getByParams(this.HorizontalTierGetDetail,params).subscribe(res => {
      console.log("This is tier data------->",res);
      this.dataMamber=res
      console.log("this is tier dataMamaber--------->",this.dataMamber.data)  
    })
}

getStatus(DataStatus:any){
  this.status=DataStatus
}


ActiveData(){
    if(this.status==1){
      this.status=0
    }
    else{
      this.status=1
    }
    let data={
      id:this.tierId,
      status:this.status
    }
  this.api.edit(this.HorizontalTierDeactivate,data).subscribe((val) => {
    console.log("This is respone from server side for edit the subsrcription plan",val)
    if (val) {
      this.statusVal=val
      if(this.statusVal.statusCode===200){
        this.toastr.success(this.statusVal.message);
        delete this.status
        this.getData();
      }
    }
  });

}

getId(id:any){
   this.tierId=id
  }

  onRowSelect(event:any) {
    alert(JSON.stringify(event))
		// this.router.navigate(['/TagAdminDetailComponent/'+this.type+'/'+ event.id])
	}

  patchValue(data:any,num:number) {
    if(num===1){
      this.tierForm.reset()
    }else{

      if(this.typeOfTier==0){
        this.tierForm.patchValue({
          tierTitle: data.tierTitle,
          pointsRewarded: data.pointsRewarded,
          pointMultiplier: data.pointMultiplier,
          profileCompletion: data.profileCompletion,
          description: data.description,
        });
      }
      else if(this.typeOfTier==1){
        this.tierForm.patchValue({
          tierTitle: data.tierTitle,
          pointsRewarded: data.pointsRewarded,
          pointEarnedValidity: data.pointEarnedValidity,
          maxPointEarningPerMonth: data.maxPointEarningPerMonth,
          maxPointRedeemedPerMonth: data.maxPointRedeemedPerMonth,
          redeemedPerTransaction: data.redeemedPerTransaction,
          minBlockRedeemedPerTransaction: data.minBlockRedeemedPerTransaction,
          additionalRewards: data.additionalRewards,
        });
      }
      
    }
  }

  TypePass(n:any){
  this.typeOfTier=n
  console.log("this is type of tier",this.typeOfTier)
  }

 editTags(data:any){
    data.id=this.tierId
    if(data.id!==undefined){
      this.api.edit(this.HostURL+this.HorizontalTierGetDetail,data).subscribe((val) => {
        if (val) {
          this.statusVal=val
          if(this.statusVal.statusCode===200){
            this.toastr.success('Edit data Successfully.');
            this.getData()
          }
        }
      });
    }
    else{
      delete data.id
      data.type=this.type
      console.log("This is data for add in tier-======>>>>",data)
      // this.api.add(this.HostURL+this.TagaddURL,data).subscribe((val) => {
      //   if (val) {
      //     this.statusVal=val
      //     if(this.statusVal.statusCode===200){
      //       this.toastr.success('Add data Successfully.');
      //       this.getData()
      //     }
      //   }
      // });
    }
 
  }

  deleteTag(id: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    const data = {
      "id": id
    }
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.delete(this.HostURL+this.TagaddURL,data).subscribe({
          next: (res) => {
            this.toastr.success("Deleted successfully")
            this.getData();
            console.log(res);
          },
          error: () => {
            this.toastr.error("Something went wrong in deletion")
          },
        });
      }
    });
  }
}
