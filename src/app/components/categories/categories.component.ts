import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit,ElementRef ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from "@angular/forms"
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service'
// import { CategorySubL1Component } from '../category-sub-l1/category-sub-l1.component';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  // entryComponents: [CategorySubL1Component]
})
export class CategoriesComponent implements OnInit {
  form: FormGroup | undefined;
  isFormValid:any = false;
  basicForm: any;
  // @ViewChild(CategorySubL1Component, { static: false }) child: CategorySubL1Component | any;
  constructor(private elementRef: ElementRef,private router:Router,
    private toastr: ToastrService,private api: ServiceService) { 
  }
  pagePerItem=0
  ngOnInit(): void {
    this.pagePerItem=5
    this.getData()
  }

dataMamber:any
  searchText = '';
 
 userId:any
  getId(categoryid:any){
     this.userId=categoryid
    this.router.navigate(['/CategorySubL1Component', this.userId], { queryParams: { id: this.userId } });
  
  }

  getData(){
    this.api.getCategory().subscribe(data => {
      console.log("This is categorire data------->",data);
      this.dataMamber=data
      console.log("this is dataMamaber--------->",this.dataMamber.data.rows)
    })
  }

  selectedRowDetail(data:any){
    alert(JSON.stringify(data))
  }
  p = 1;
 
  loadDataPage(event: PageEvent) {
    this.pagePerItem=event.pageSize
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
