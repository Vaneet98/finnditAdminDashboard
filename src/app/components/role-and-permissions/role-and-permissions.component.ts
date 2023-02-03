import { Component, OnInit,ElementRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/service.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-role-and-permissions',
  templateUrl: './role-and-permissions.component.html',
  styleUrls: ['./role-and-permissions.component.css']
})
export class RoleAndPermissionsComponent implements OnInit {

  constructor(private elementRef: ElementRef,private toastr: ToastrService,private api: ServiceService,private fb: FormBuilder,private dialog: MatDialog) { }
  HostURL=environment.hostULR
  roleAndPermission=environment.roleAndPermission
  roleAndPermissionById=environment.roleAndPermissionById
  // roleAndPermission: FormGroup | any;
  ngOnInit(): void {
    this.pagePerItem=5
    this.getData()
    // this.roleAndPermission = this.fb.group({
    //   name: ['', Validators.required],
    //   email:['', Validators.required],
    //   phoneNumber:['', Validators.required],
    //   role:['', Validators.required],
    //   admin_tags:['', Validators.required],
    // });
  }
  p = 1;
  searchText = '';
  pagePerItem=0
  loadDataPage(event: PageEvent) {
    this.pagePerItem=event.pageSize
}
teamIds:any
  getId(id:any){
this.teamIds=id
  }
teamId:any
  sendValue(num:any){
    this.teamId=num
  }

  patchValue(data:any,num:any) {
    if(num==2){
      // this.roleAndPermission.reset()
    }else{
      // this.roleAndPermission.patchValue({
      //   name: data.firstName,
      //   email: data.email ,
      //   phoneNumber:data.phoneNumber ,

      //   admin_tags:data.admin_tags ,
      // });
    }
  }
  dataMamber:any
  getData(){
    this.api.getAll(this.HostURL+this.roleAndPermission).subscribe(data => {
      console.log("This is role and permission data------->",data);
      this.dataMamber=data
      console.log("this is role and permission dataMamaber--------->",this.dataMamber.data.permissions.name)
    })
  }
datarecord:any
  getRecordSingle(id:any){
  this.api.getById(this.HostURL+this.roleAndPermissionById+id).subscribe(data => {
  console.log("This is role and permission  by id data------->",data);
  this.datarecord=data
  console.log("this is role and permission dataMamaber--------->",this.datarecord.data.role_permissions)
})
  }

statusVal:any
deleteRole(id: any) {
  const dialogRef = this.dialog.open(DeleteDialogComponent);
  const data = {
    "id": id
  }
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.api.delete(this.HostURL+this.roleAndPermission,data).subscribe({
        next: (res) => {
          this.toastr.success("Deleted Successfully.")
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
