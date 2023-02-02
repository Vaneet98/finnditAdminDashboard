import { Component, OnInit, ElementRef  } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/service.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-admin-banners',
  templateUrl: './admin-banners.component.html',
  styleUrls: ['./admin-banners.component.css']
})
export class AdminBannersComponent implements OnInit {
  constructor(private elementRef: ElementRef,private api: ServiceService) { }
  selectedDataMember: any;
  AdminBannerURL=environment.adminBannerURL
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

  dataMamber:any

  getData(){
    this.api.getAll(this.AdminBannerURL).subscribe(data => {
      console.log("This is admin Banner data------->",data);
      this.dataMamber=data
      this.dataMamber=this.dataMamber.data
      console.log("this is dataMamaber--------->",this.dataMamber.data)
    })
  }
  getId(id:any){

  }
}  
