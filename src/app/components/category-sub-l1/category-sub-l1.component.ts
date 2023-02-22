import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit,ElementRef ,ViewChild, Input} from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import {NgForm} from "@angular/forms"
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-category-sub-l1',
  templateUrl: './category-sub-l1.component.html',
  styleUrls: ['./category-sub-l1.component.css']
})
export class CategorySubL1Component implements OnInit {
  HostURL=environment.hostULR
  SubcategoryL1URL=environment.SubcategoryL1URL
  // @Input() categoryId:any;
  L1id:any
  id:any
  form: FormGroup | undefined;
  isFormValid:any = false;
  basicForm: any;
  event:any
  page: number=1;
  count: number = 0;
  tableSize: number = 5;
  search = '';
  limit=5
  skip=0
  sortOrder ='DESC'
  dataMamber:any 
 userId:any
  constructor(private elementRef: ElementRef,private router:Router,
    private toastr: ToastrService,private api: ServiceService,private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.L1id = params['L1id'];
      this.event=params['event']
      this.page=params['e']
    });
    console.log("THis is parameter id",this.L1id)
    if(this.page){
      this.page=this.page
    }else{
      this.page=1
    }    
    console.log("this is page: " + this.page)
    this.skip=(this.page-1)
    this.getDataOfSubCateL1(this.L1id)
  }

      //For searching
      onTextChange(value: any) {
        this.search = value;
        this.getDataOfSubCateL1(this.L1id);
      }
      
      //This is for pagination
      onTableDataChange(event: any) {
        console.log("this is evetn=======>",event);
        this.router.navigate(['/CategorySubL1Component/'],{ queryParams: {event:this.event,L1id: this.L1id,e:event } });
        this.page = event;
        this.skip=(this.page-1)
        console.log("This is limit",this.limit)
        console.log("This is skippped",this.skip)
        this.getDataOfSubCateL1(this.L1id);
      }
      
      changeSortOrder(value: any): void {
        this.sortOrder = this.sortOrder === 'DESC' ? 'ASC' : 'DESC';
        this.getDataOfSubCateL1(this.L1id);
      }


  getId(id:any){
     console.log("this is data",JSON.stringify(id))
     alert(JSON.stringify(id))
     this.userId=id
  }

  moveTol2(id:any){
     this.router.navigate(['CategorySubL1Component/l2/'], { queryParams: {event:this.event,L1id:this.L1id,e:this.page,id:id } });
  }


 public getDataOfSubCateL1(id:any){
  let params = new HttpParams();
  params = params.set('limit', this.limit);
  params = params.set('skip', this.skip);
  if(this.search != null && this.search != ''){
    params =  params.append('search',this.search)
  }
  params=params.set("categoryId",id)
    this.api.getByParams(this.HostURL+this.SubcategoryL1URL,params).subscribe(data => {
      console.log("This is SubcategorireL1 data------->",data);
      this.dataMamber=data
      this.count=this.dataMamber.data.count
      console.log("this is dataMamaber of subCategoryL1--------->",this.dataMamber.data.rows)
    })
  }

  getbacktocategory(){
    this.router.navigate(['/categories'],{queryParams:{event:this.event}});
  }

  selectedRowDetail(data:any){
    alert(JSON.stringify(data))
  }
  getdataEdit(form:any){
    form.userId=this.userId.id
    console.log("This is  ----------->",form)
    this.toastr.success('Edit data Successfully.');
  }


  deactivateValue:any={}
  deactivate(){
    this.userId
    this.deactivateValue.userId=this.userId
    this.deactivateValue.value=1
    console.log(this.deactivateValue)
    this.toastr.success('Deactivate data Successfully.');
  }

  deleteAt:any={}
  deleteData(){
    this.userId
    this.deleteAt.userId=this.userId
    this.deleteAt.value=1
    console.log("This is deleted",this.deleteAt)
    this.toastr.success('Deleted data Successfully.');
  }
}
