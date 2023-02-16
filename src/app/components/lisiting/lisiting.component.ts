import { Component, OnInit,ElementRef ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService,Spinner } from 'ngx-spinner';
@Component({
  selector: 'app-lisiting',
  templateUrl: './lisiting.component.html',
  styleUrls: ['./lisiting.component.css']
})
export class LisitingComponent implements OnInit {

  HostURL=environment.hostULR
  listingURL= environment.listingURL;
  listingActiveReject=environment.listingActiveReject;
  form: FormGroup | undefined;
  isFormValid:any = false;
  basicForm: any;
  page: number=1;
  count: number = 0;
  tableSize: number = 5;
  sortOrder ='DESC'
  limit=5
  skip=0
  listingType:any
  id:any
  constructor(private elementRef: ElementRef,private api: ServiceService ,private dialog: MatDialog,
    private router:Router,private fb: FormBuilder,private toastr: ToastrService,
    private route:ActivatedRoute,private spinner:NgxSpinnerService) { 
      this.spinner.show()
  }
//For Stop uploading when all component render successfully
  ngAfterViewInit() {
    setTimeout(() => {
      this.spinner.hide();
    });
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
  console.log("this is page: " + this.page)
  this.skip=(this.page-1)
  // this.skip=0
    this.getData()
  }

 

//This is for close the popup window
@ViewChild('closebutton') closebutton: any;

public onSave() {
  this.closebutton.nativeElement.click();
}


dataMamber:any
  search = '';
 
  getData(){
    let params = new HttpParams();
    params = params.set('limit', this.limit);
    params = params.set('skip', this.skip);
    if(this.search != null && this.search != ''){
			params =  params.append('search',this.search)
		}
    console.log("This is for params",params)
    this.api.getByParams(this.HostURL+this.listingURL,params).subscribe(data => {
      console.log("This is listingURL data------->",data);
      this.dataMamber=data
      this.count=this.dataMamber.data.count
      console.log("this is listingURL--------->",this.dataMamber.data.rows)
    })
  }
    //For searching
    onTextChange(value: any) {
      this.search = value;
      this.getData();
    }
    
    //This is for pagination
    onTableDataChange(event: any) {
      this.router.navigate(['listing'], { queryParams: {event: event } });
      this.page = event;
      this.skip=(this.page-1)
      this.getData();
    }
    
    changeSortOrder(value: any): void {
      this.sortOrder = this.sortOrder === 'DESC' ? 'ASC' : 'DESC';
      this.getData();
    }

    getStatus(num:any){
       this.listingType=num
    }

    getId(id:any){
      this.id=id
    }
    approveReject(){
      let params = new HttpParams();
      params = params.set('isBlocked', this.listingType);
      console.log("pARAMS",params)
      this.api.edits(this.HostURL+this.listingActiveReject+this.listingType,this.id).subscribe(data => {
         if(data){
          this.toastr.success("Success")
          this.getData();
         }
      })
    }

}
