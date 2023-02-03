import { Component, OnInit,ElementRef } from '@angular/core';
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
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  HostURL=environment.hostULR
  TageURL=environment.TageURL;
  TagaddURL=environment.TagaddURL;
  TagAdminDetailURL=environment.TagAdminDetailURL;
  statusVal: any;
  tagForm: FormGroup | any;
  pagePerItem=0
  searchText = '';
  p = 1;
  dataMamber:any;
  dataMamaberMarchant:any
  tagId:any
  type:any=1
  editTag=false
  deleteTags=false
  addTag=false

  constructor(private elementRef: ElementRef,private api: ServiceService,private dialog: MatDialog,
    private toastr: ToastrService,private fb: FormBuilder,private router: Router) { 

  }
  loadDataPage(event: PageEvent) {
    this.pagePerItem=event.pageSize
}
  ngOnInit(): void {
   this.pagePerItem=5
   this.getData()
    this.tagForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
 
getData(){
  this.api.getById(this.HostURL+this.TageURL+this.type).subscribe(res => {
    console.log("This is tageAdmin data------->",res);
    this.dataMamber=res
    console.log("this is tageAdmin dataMamaber--------->",this.dataMamber.data.rows)
    // permission
				
    for(let data of this.dataMamber.data.permissions.role_permissions){
      if (data.permission.name=="Add Tag") {
        this.addTag=true
      }
      if (data.permission.name=="Edit Tag") {
        this.editTag=true
      }
      if(data.permission.name=="Delete Tag"){
        this.deleteTags=true
      }
  }  
  })
}

getId(id:any){
   this.tagId=id
  }

  onRowSelect(event:any) {
		this.router.navigate(['/TagAdminDetailComponent/'+this.type+'/'+ event.id])
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
      console.log("This is data for add",data)
      this.api.add(this.HostURL+this.TagaddURL,data).subscribe((val) => {
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
