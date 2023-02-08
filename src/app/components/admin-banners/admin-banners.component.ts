import { Component, OnInit, ElementRef,ViewChild  } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { ServiceService } from 'src/app/service.service';
import { environment } from 'src/environments/environment';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-banners',
  templateUrl: './admin-banners.component.html',
  styleUrls: ['./admin-banners.component.css']
})
export class AdminBannersComponent implements OnInit {
  constructor(private elementRef: ElementRef,private api: ServiceService,private dialog: MatDialog,private toastr: ToastrService) { }
  selectedDataMember: any;
  HostURL=environment.hostULR
  AdminBannerURL=environment.adminBannerURL
  AdminBannerDeleteURL=environment.adminBannerdeleteURL
  onRowClick(data:any):void {
    console.log("this is admin banner")
    alert(data);
  }
  p = 1;
  searchText = '';
  pagePerItem=0
  loadDataPage(event: PageEvent) {
    this.pagePerItem=event.pageSize
}
  ngOnInit(): void {
  this.pagePerItem=5
  this.getData()
  }


//This is for close the popup window
@ViewChild('closebutton') closebutton: any;

public onSave() {
  this.closebutton.nativeElement.click();
}


  dataMamber:any

  getData(){
    this.api.getAll(this.AdminBannerURL).subscribe(data => {
      console.log("This is admin Banner data------->",data);
      this.dataMamber=data
      this.dataMamber=this.dataMamber.data
      console.log("this is dataMamaber--------->",this.dataMamber.data)
    })
  }
  statusVal:any
  deleteAdminBanner(id: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    const data = {
      "id": id
    }
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.delete(this.AdminBannerDeleteURL,data).subscribe({
          next: (res) => {
            this.toastr.success("Delete successfully")
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

  getId(id:any){

  }
}  
