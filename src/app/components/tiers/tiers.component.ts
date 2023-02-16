import { Component, OnInit,ElementRef ,ViewChild} from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { HttpParams, HttpClient } from "@angular/common/http"
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from "@angular/router";
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService,Spinner } from 'ngx-spinner';
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
  tierFormHorizontal: FormGroup | any;
  tierFormVertical: FormGroup | any;
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
  page: number=1;
  count: number = 0;
  tableSize: number = 5;
  search = '';
  sortOrder ='ASC'
  number:any
  constructor(private elementRef: ElementRef,private api: ServiceService,private dialog: MatDialog,
    private toastr: ToastrService,private fb: FormBuilder,
    private router: Router,private route:ActivatedRoute,private spinner:NgxSpinnerService) { 
      this.spinner.show()
  }
//For Stop uploading when all component render successfully
  ngAfterViewInit() {
    setTimeout(() => {
      this.spinner.hide();
    });
   }
//This is for close the popup window
@ViewChild('closebutton') closebutton: any;
public onSave() {
  this.closebutton.nativeElement.click();
}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = params['event'];
    });
  if(this.page){
    this.page=this.page
  }else{
    this.page=1
  }
   this.getData()
    this.tierFormHorizontal = this.fb.group({
      // image: ['', Validators.required],
      tierTitle: ['', Validators.required],
      pointsRewarded: ['', Validators.required],
      pointMultiplier: ['', Validators.required],
      profileCompletion: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.tierFormVertical=this.fb.group({
      tierTitle: ['', Validators.required],
      pointEarnedValidity: ['', Validators.required],
      maxPointEarningPerMonth: ['', Validators.required],
      maxPointRedeemedPerMonth: ['', Validators.required],
      redeemedPerTransaction: ['', Validators.required],
      minBlockRedeemedPerTransaction: ['', Validators.required],
      additionalRewards: ['', Validators.required],
    })
}
getData(){
  let params = new HttpParams();
  params = params.set('limit', 10);
  params = params.set('skip', 0);
  params = params.set('tierType', this.type.toString());
  params = params.append('orderBy',this.sortOrder)
    this.api.getByParams(this.HorizontalTierGetDetail,params).subscribe(res => {
      console.log("This is tier data------->",res);
      this.dataMamber=res
      console.log("this is tier dataMamaber--------->",this.dataMamber.data)  
    })
}
getStatus(DataStatus:any){
  this.status=DataStatus
}
  //For searching
  onTextChange(value: any) {
    this.search = value;
    this.getData();
  }
  //This is for pagination
  onTableDataChange(event: any) {
    this.router.navigate(['tier'], { queryParams: {event: event } });
    this.page = event;
    this.getData();
  }
  changeSortOrder(value: any): void {
    this.sortOrder = this.sortOrder === 'DESC' ? 'ASC' : 'DESC';
    this.getData();
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
    console.log("This is respone from server side for edit the tier plan",val)
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
   console.log("this is tierId--------->",this.tierId)
  }
  TypePass(n:any){
    this.typeOfTier=n
    console.log("this is type of tier",this.typeOfTier)
    }
  patchValue(data:any,num:number) {
    this.number=num
    if(num===1){
      this.tierFormHorizontal.reset()
    }
    else if(this.typeOfTier==1&&num!==1){
      this.tierFormVertical.patchValue({
        tierTitle: data.tierTitle,
        pointEarnedValidity: data.pointEarnedValidity,
        maxPointEarningPerMonth: data.maxPointEarningPerMonth,
        maxPointRedeemedPerMonth: data.maxPointRedeemedPerMonth,
        redeemedPerTransaction: data.redeemedPerTransaction,
        minBlockRedeemedPerTransaction: data.minBlockRedeemedPerTransaction,
        additionalRewards: data.additionalRewards
      });
    }
    else{
    this.tierFormHorizontal.patchValue({
        tierTitle: data.tierTitle,
        pointsRewarded: data.pointsRewarded,
        pointMultiplier: data.pointMultiplier,
        profileCompletion: data.profileCompletion,
        description:data.description,
      });
     
    }
  }
  editTags(data:any){
    if(this.tierFormHorizontal.valid||this.tierFormVertical.valid){
      data.id=this.tierId
      if(data.id!==undefined){
        this.api.edit(this.HorizontalTierGetDetail,data).subscribe((val) => {
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
        data.tierType=this.typeOfTier
        console.log("This is data for add in tier-======>>>>",data)
        this.api.add(this.HorizontalTierGetDetail,data).subscribe((val) => {
          if (val) {
            this.statusVal=val
            if(this.statusVal.statusCode===200){
              this.toastr.success('Add data Successfully.');
              this.getData()
            }
          }
        });
      }
    }
    else{
      this.toastr.error('All fields are required.');
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
