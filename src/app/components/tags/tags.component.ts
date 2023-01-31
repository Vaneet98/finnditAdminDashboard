import { Component, OnInit,ElementRef } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  public selectedTab: "one" | "two"
  statusVal: any;
  constructor(private elementRef: ElementRef,private api: ServiceService,private toastr: ToastrService) { 
    this.selectedTab = "one";
  }


  ngOnInit(): void {
    this.getDataAdminTage()
    this.getDataMarchantTage()
  }
  dataMamber:any;
  dataMamaberMarchant:any

  getDataAdminTage(){
    this.api.getTage("1").subscribe(data => {
      console.log("This is tageAdmin data------->",data);
      this.dataMamber=data
      console.log("this is tageAdmin dataMamaber--------->",this.dataMamber.data.rows)
    })
  }

  getDataMarchantTage(){
    this.api.getTage("2").subscribe(data => {
      console.log("This is tageAdmin data------->",data);
      this.dataMamaberMarchant=data
      console.log("this is tageAdmin dataMamaber--------->",this.dataMamaberMarchant.data.rows)
    })
  }
 
  public show( tab: "one" | "two" ) : void {
    this.selectedTab = tab;
  }
tagId:any
  getId(id:any){
this.tagId=id
  }

  editTag(data:any){
  data.id=this.tagId
  alert(data)
  this.api.editTag(data).subscribe((val) => {
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

  deleteTag(){
    this.api.deleteTag(this.tagId)
  }

}
