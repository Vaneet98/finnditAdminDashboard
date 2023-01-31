import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit,ElementRef ,ViewChild, Input} from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import {NgForm} from "@angular/forms"
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service'
@Component({
  selector: 'app-tag-admin-detail',
  templateUrl: './tag-admin-detail.component.html',
  styleUrls: ['./tag-admin-detail.component.css']
})
export class TagAdminDetailComponent implements OnInit {
  @Input() categoryId:any;
  form: FormGroup | undefined;
  isFormValid:any = false;
  basicForm: any;
  type: any;
  tagId: any;
  constructor(private elementRef: ElementRef,private router:Router,
    private toastr: ToastrService,private api: ServiceService,private route: ActivatedRoute) { 
  }
  pagePerItem=0
  data:{}|any
  ngOnInit(): void {
    this.pagePerItem=5
    this.route.params.subscribe(params => {
      this.tagId = params['tagId'];
      this.type=params['typeId']
    });

    console.log("THis is parameter id",this.tagId)
    console.log("THis is parameter type",this.type)
    this.getDataOfTageAdminDetail(this.type,this.tagId)
  }

dataMamber:any 
  searchText = '';
  
 admintagId:any
  getdata(data:any){
     this.admintagId=data
  }
  id:any

 public getDataOfTageAdminDetail(type:any,tagId:any){
    this.api.getTagAdminDetail(type,tagId).subscribe(data => {
      console.log("This is getDataOfTageAdminDetail data------->",data);
      this.dataMamber=data
      if(this.type===1){
        this.dataMamber=this.dataMamber.data.rows
      }
      else{
        this.dataMamber=this.dataMamber.data.rows
      }
      console.log("this is dataMamaber of getDataOfTageAdminDetail--------->",this.dataMamber)
    })
  }

  getbacktoTag(){
    this.router.navigate(['/tags']);
  }

  selectedRowDetail(data:any){
    alert(JSON.stringify(data))
  }
  p = 1;
 
  loadDataPage(event: PageEvent) {
    this.pagePerItem=event.pageSize
}
UnassignedValue:any={}
  Unassigned(){
    this.UnassignedValue={
      type:this.type,
      tagId:this.admintagId.tagId,
      userId:this.admintagId.adminId
    }
    console.log( this.UnassignedValue)
    this.api.Unassigned(this.UnassignedValue)
    this.toastr.success('Unassigned data Successfully.');
  }
}
