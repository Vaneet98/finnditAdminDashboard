import { Component, OnInit,ElementRef ,ViewChild} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/service.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router,ActivatedRoute  } from '@angular/router';
import { NgxSpinnerService,Spinner } from 'ngx-spinner';
@Component({
  selector: 'app-role-and-permissions',
  templateUrl: './role-and-permissions.component.html',
  styleUrls: ['./role-and-permissions.component.css']
})
export class RoleAndPermissionsComponent implements OnInit {
  search: any;

  constructor(private elementRef: ElementRef,private toastr: ToastrService,
    private api: ServiceService,private fb: FormBuilder,private dialog: MatDialog,
    private router:Router,private route: ActivatedRoute,private spinner:NgxSpinnerService) { 
      this.spinner.show()
    }
  //For Stop uploading when all component render successfully
    ngAfterViewInit() {
      setTimeout(() => {
        this.spinner.hide();
      });
     }
  HostURL=environment.hostULR
  roleAndPermission=environment.roleAndPermission
  roleAndPermissionById=environment.roleAndPermissionById
  page: number=1;
  count: number = 0;
  tableSize: number = 10;
  sortOrder ='DESC'
  teamIds:any
  teamId:any
  dataMamber:any
  datarecord:any
statusVal:any
roleAndPermissions:any|undefined
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = params['event'];
    });
  if(this.page){
    this.page=this.page
  }else{
    this.page=1
  }
    this.getData()
  }
  

//For close the popup after click on save button
@ViewChild('closebutton') closebutton: any;

public onSave() {
  this.closebutton.nativeElement.click();
}


  getId(id:any){
  this.teamIds=id
  }

  sendValue(num:any){
    this.teamId=num
  }

  //For searching
  onTextChange(value: any) {
    this.search = value;
    this.getData();
  }
  
  //This is for pagination
  onTableDataChange(event: any) {
    this.router.navigate(['roleandpermission'], { queryParams: {event: event } });
    this.page = event;
    this.getData();
  }

  patchValue(data:any,num:any) {
    if(num==2){
      // this.roleAndPermissions.reset()
    }else{
      // this.roleAndPermission.patchValue({
      //   name: data.firstName,
      //   email: data.email ,
      //   phoneNumber:data.phoneNumber ,

      //   admin_tags:data.admin_tags ,
      // });
    }
  }
  
  getData(){
    this.api.getAll(this.HostURL+this.roleAndPermission).subscribe(data => {
      console.log("This is role and permission data------->",data);
      this.dataMamber=data
      console.log("this is role and permission dataMamaber--------->",this.dataMamber.data.permissions.name)
    })
  }

  getRecordSingle(id:any){
  this.api.getById(this.HostURL+this.roleAndPermissionById+id).subscribe(data => {
  console.log("This is role and permission  by id data------->",data);
  this.datarecord=data
  console.log("this is role and permission dataMamaber--------->",this.datarecord.data.role_permissions)
   })
}

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
