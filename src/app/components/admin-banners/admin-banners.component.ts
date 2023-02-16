import { Component, OnInit, ElementRef,ViewChild  } from '@angular/core';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { ServiceService } from 'src/app/service.service';
import { environment } from 'src/environments/environment';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService,Spinner } from 'ngx-spinner';
@Component({
  selector: 'app-admin-banners',
  templateUrl: './admin-banners.component.html',
  styleUrls: ['./admin-banners.component.css']
})
export class AdminBannersComponent implements OnInit {
  constructor(private elementRef: ElementRef,private api: ServiceService,
    private dialog: MatDialog,private toastr: ToastrService,
    private route:ActivatedRoute,private router:Router,private spinner:NgxSpinnerService ) { 
      this.spinner.show()
    }

    ngAfterViewInit() {
      setTimeout(() => {
        this.spinner.hide();
     });
     }

  selectedDataMember: any;
  HostURL=environment.hostULR
  AdminBannerURL=environment.adminBannerURL
  AdminBannerDeleteURL=environment.adminBannerdeleteURL
  page: number=1;
  count: any;
  tableSize: number = 5;
  search = '';
  sortOrder ='DESC'
  statusVal:any
  dataMamber:any
  limit=5
  skip=0
  lengths:any
  onRowClick(data:any):void {
    console.log("this is admin banner")
    alert(data);
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = params['event'];
    });
  if(this.page){
    this.page=this.page
  }else{
    this.page=1
  } 
  this.skip=(this.page-1)
  this.getData()
  }
  //For searching
  onTextChange(value: any) {
    this.search = value;
    this.getData();
  }
  
  //This is for pagination
  onTableDataChange(event: any) {
    this.router.navigate(['adminbanner'], { queryParams: {event: event } });
    this.page = event;
    this.skip=(this.page-1)
    this.getData();
  }
  
  changeSortOrder(value: any): void {
    this.sortOrder = this.sortOrder === 'DESC' ? 'ASC' : 'DESC';
    this.getData();
  }

//This is for close the popup window
@ViewChild('closebutton') closebutton: any;

public onSave() {
  this.closebutton.nativeElement.click();
}

  getData(){
    let params = new HttpParams();
    params = params.set('limit', this.limit);
    params = params.set('skip', this.skip);
    params = params.append('orderBy',this.sortOrder)
    if(this.search != null && this.search != ''){
			params =  params.append('search',this.search)
		}
    this.api.getAll(this.AdminBannerURL).subscribe(data => {
      console.log("This is admin Banner data------->",data);
      this.dataMamber=data
      this.dataMamber=this.dataMamber.data
      //this is for count the total data in the api
      this.lengths=this.dataMamber.data.length
      this.count=this.lengths
  
      console.log("this is dataMamaber--------->",this.dataMamber.data)
    })
  }

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
