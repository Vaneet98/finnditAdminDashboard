import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit,ElementRef ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from "@angular/forms"
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  HostURL=environment.hostULR
  categoryURL= environment.CategoryURL;
  form: FormGroup | undefined;
  isFormValid:any = false;
  basicForm: any;
  page: number=1;
  count: number = 0;
  tableSize: number = 5;
  sortOrder ='DESC'
  limit=5
  skip=0
  dataMamber:any
  search = '';
  userId:any;
  deactivateValue:any={};
  deleteAt:any={};
  constructor(private elementRef: ElementRef,private router:Router,
    private toastr: ToastrService,private api: ServiceService,private route:ActivatedRoute,private spinner:NgxSpinnerService) { 
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
    this.getData()
  }


//This is for close the popup window
@ViewChild('closebutton') closebutton: any;

public onSave() {
  this.closebutton.nativeElement.click();
}
 
    //For searching
  onTextChange(value: any) {
      this.search = value;
      this.getData();
    }
    
    //This is for pagination
    onTableDataChange(event: any) {
      this.router.navigate(['categories'], { queryParams: {event: event } });
      this.page = event;
      this.skip=(this.page-1)
      this.getData();
    }
    
    changeSortOrder(value: any): void {
      this.sortOrder = this.sortOrder === 'DESC' ? 'ASC' : 'DESC';
      this.getData();
    }



  getId(categoryid:any){ 
     this.userId=categoryid   //
    //  this.router.navigate(['/CategorySubL1Component'], { queryParams: { L1id: this.userId } });
    // this.router.navigate(['/CategorySubL1Component', this.userId],);
  
  }
  moveTol1(categoryid:any){
    this.userId=categoryid   
    this.router.navigate(['/CategorySubL1Component/c1/',this.userId]);
  }

  getData(){
    let params = new HttpParams();
    params = params.set('limit', this.limit);
    params = params.set('skip', this.skip);
    if(this.search != null && this.search != ''){
			params =  params.append('search',this.search)
		}
    console.log("This is for params",params)

    this.api.getByParams(this.HostURL+this.categoryURL,params).subscribe(data => {
      console.log("This is categorire data------->",data);
      this.dataMamber=data
      this.count=this.dataMamber.data.count
      console.log("this is dataMamaber--------->",this.dataMamber.data.rows)
    })
  }

  getdataEdit(form:any){
    form.userId=this.userId.id
    console.log("This is  ----------->",form)
    this.toastr.success('Edit data Successfully.');
  }

  deactivate(){
    this.userId
    this.deactivateValue.userId=this.userId
    this.deactivateValue.value=1
    console.log(this.deactivateValue)
    this.toastr.success('Deactivate data Successfully.');
  }

  deleteData(){
    this.userId
    this.deleteAt.userId=this.userId
    this.deleteAt.value=1
    console.log("This is deleted",this.deleteAt)
    this.toastr.success('Deleted data Successfully.');
  }
  
}
