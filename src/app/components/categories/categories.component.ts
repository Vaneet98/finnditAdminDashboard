import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit,ElementRef ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from "@angular/forms"
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  form: FormGroup | undefined;
  isFormValid:any = false;
  basicForm: any;
  constructor(private elementRef: ElementRef,private router:Router,private toastr: ToastrService) { 
  }
  pagePerItem=0
  ngOnInit(): void {
    this.pagePerItem=5
  }


  searchText = '';
  dataMamber=[
    {id:1,name:"Vaneet kumar",subcategory:"Test",productandservice:"Test11",status:"Panding"},
    {id:2,name:"Sachin thakur",subcategory:"SubTest1",productandservice:"Red11",status:"Approved"},
    {id:3,name:"Ankush thakur",subcategory:"cat",productandservice:"Product",status:"Panding"},
    {id:4,name:"Harish Goal",subcategory:"mouse",productandservice:"Test11",status:"Panding"},
    {id:5,name:"Tanvi negi",subcategory:"text",productandservice:"Test11",status:"Approved"},
    {id:6,name:"Pankaj",subcategory:"Pen",productandservice:"Test11",status:"Panding"},
    {id:7,name:"Rhitik Jamwal",subcategory:"Laptop",productandservice:"Test11",status:"Panding"},
    {id:8,name:"Vishal thakur",subcategory:"Event",productandservice:"Test11",status:"Approved"},
    {id:9,name:"Sonali",subcategory:"Router",productandservice:"Test11",status:"Approved"},
    {id:10,name:"Sourav kumar",subcategory:"None",productandservice:"Test11",status:"Panding"},
    {id:11,name:"Kush",subcategory:"Apple",productandservice:"Test11",status:"Panding"},
    {id:12,name:"Mohit",subcategory:"Mango",productandservice:"Test11",status:"Approved"},
    {id:13,name:"Pushpa kumari",subcategory:"Banana",productandservice:"Test11",status:"Panding"},
    {id:14,name:"Ravi thakur",subcategory:"Upper",productandservice:"Test11",status:"Approved"},
    {id:15,name:"Ronit thakur",subcategory:"Lower",productandservice:"Test11",status:"Panding"},
    {id:16,name:"Rishabh sharma",subcategory:"Red",productandservice:"Test11",status:"Approved"},
    {id:17,name:"Rahul thakur",subcategory:"Blue",productandservice:"Test11",status:"Panding"},
  ]
 userId:any
  getId(id:any){
     console.log("this is data",JSON.stringify(id))
     alert(JSON.stringify(id))
    this.userId=id
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
