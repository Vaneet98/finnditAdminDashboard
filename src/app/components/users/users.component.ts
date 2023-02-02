import { Component, OnInit, ElementRef} from '@angular/core';
import { ServiceService } from '../../service.service'
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  HostURL=environment.hostULR
  UserULR=environment.UserUrl;
  statusVal: any;
  constructor(private elementRef: ElementRef,private api: ServiceService,private toastr: ToastrService ) { }
  pagePerItem=0
  searchText = '';
  p = 1;
 
  loadDataPage(event: PageEvent) {
    this.pagePerItem=event.pageSize
}
  ngOnInit(): void {
    this.pagePerItem=5
  this.getData()
  }
  userId:any
  Blocked:any
  activeData:{ id: ""; isBlocked: ""; } | any
 getId(id:any,isBlocked:any){
   this.activeData={
    id:id,
    isBlocked:isBlocked
   }
   this.Blocked=isBlocked
 }

  dataMamber:any
  getData(){
    this.api.getAll(this.HostURL+this.UserULR).subscribe(data => {
      console.log("This is subscription plan data------->",data);
      this.dataMamber=data
      console.log("this is subscription plan dataMamaber--------->",this.dataMamber.data)
    })
  }
  ActiveData(): void{
    this.api.edit(this.HostURL+this.UserULR,this.activeData).subscribe((val) => {
      console.log("This is respone from server side for edit the subsrcription plan",val)
      if (val) {
        this.statusVal=val
        if(this.statusVal.statusCode===200){
          this.toastr.success(this.statusVal.message);
          delete this.activeData.id
          delete this.activeData.isBlocked
          this.getData();
        }
      }
    });
  }
}
