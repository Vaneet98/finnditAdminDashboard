import { Component, OnInit,ElementRef } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  HostURL=environment.hostULR
  TageURL=environment.TageURL;
  TagaddURL=environment.TagaddURL;
  TagAdminDetailURL=environment.TagAdminDetailURL;
  public selectedTab: "one" | "two"
  statusVal: any;
  tagForm: FormGroup | any;
  pagePerItem=0
  searchText = '';
  p = 1;
  dataMamber:any;
  dataMamaberMarchant:any
  tagId:any
  typeId:any
  constructor(private elementRef: ElementRef,private api: ServiceService,private toastr: ToastrService,private fb: FormBuilder) { 
    this.selectedTab = "one";
  }
  loadDataPage(event: PageEvent) {
    this.pagePerItem=event.pageSize
}
  ngOnInit(): void {
   this.pagePerItem=5
    this.getDataAdminTage()
    this.getDataMarchantTage()
    this.tagForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
 
  getDataAdminTage(){
    this.api.getById(this.HostURL+this.TageURL+1).subscribe(data => {
      console.log("This is tageAdmin data------->",data);
      this.dataMamber=data
      console.log("this is tageAdmin dataMamaber--------->",this.dataMamber.data.rows)
    })
  }

  getDataMarchantTage(){
    this.api.getById(this.HostURL+this.TageURL+2).subscribe(data => {
      console.log("This is tageAdmin data------->",data);
      this.dataMamaberMarchant=data
      console.log("this is tageAdmin dataMamaber--------->",this.dataMamaberMarchant.data.rows)
    })
  }
 
  public show( tab: "one" | "two" ) : void {
    this.selectedTab = tab;
  }

  getId(id:any){
   this.tagId=id
  }

  sendType(v:any){
  this.typeId=v
  }

  patchValue(data:any,num:number) {
    if(num===1){
      this.tagForm.reset()
    }else{
      this.tagForm.patchValue({
        name: data.name !==undefined ? data.name : "",
      });
    }
  }

 editTags(data:any){
    data.id=this.tagId
    if(data.id!==undefined){
      this.api.edit(this.HostURL+this.TageURL,data).subscribe((val) => {
        console.log("This is respone from server side for edit the subsrcription plan",val)
        if (val) {
          this.statusVal=val
          if(this.statusVal.statusCode===200){
            this.toastr.success('Edit data Successfully.');
            this.getDataAdminTage()
           this.getDataMarchantTage()
          }
        }
      });
    }
    else{
      delete data.id
      data.type=this.typeId
      console.log("This is data for add",data)
      this.api.add(this.HostURL+this.TagaddURL,data).subscribe((val) => {
        console.log("This is respone from server side for add the subsrcription plan",val)
        if (val) {
          this.statusVal=val
          if(this.statusVal.statusCode===200){
            this.toastr.success('Add data Successfully.');
            this.typeId=null
            this.getDataAdminTage()
           this.getDataMarchantTage()
          }
        }
      });
    }
 
  }

  deleteTag(){
    this.api.delete(this.HostURL+this.TagaddURL,this.tagId).subscribe((val)=>{
      if(val){
        this.statusVal=val
        if(this.statusVal.statusCode===200){
          this.toastr.success('Deleted data Successfully.');
          this.getDataAdminTage()
         this.getDataMarchantTage()
        }
      }
    })
  }
}
