import { Component, OnInit, ElementRef,ViewChild} from '@angular/core';
import { ServiceService } from '../../service.service'
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute  } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService,Spinner } from 'ngx-spinner';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  HostURL=environment.hostULR;
  UserULR=environment.UserUrl;
  userId:any;
  Blocked:any;
  activeData:{ id: ""; isBlocked: ""; } | any;
  dataMamber:any;
  statusVal: any;
  sortBy: string|any;
  sortOrder: string|any;
  page: number=1;
  count: any;
  tableSize: number = 5;
  search = '';
  limit=5
  skip=0
  constructor(private elementRef: ElementRef,private api: ServiceService,
    private toastr: ToastrService,private route: ActivatedRoute,
    private router:Router,private spinner:NgxSpinnerService ) { 
      this.spinner.show()
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    }
  

    @ViewChild('closebutton') closebutton: any;

    public onSave() {
      this.closebutton.nativeElement.click();
    }
//This is for sorting
toggleSortOrder() {
  this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
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
    this.getData()
  }
 //Get the id
 getId(id:any,isBlocked:any){
   this.activeData={
    id:id,
    isBlocked:isBlocked
   }
   this.Blocked=isBlocked
 }
//For searching
 onTextChange(value: any) {
  this.search = value;
  this.getData();
}

//This is for get data form backend
  getData(){
    let params = new HttpParams();
    params = params.set('limit', this.limit); 
    params = params.set('skip', this.skip);
    if(this.search != null && this.search != ''){
			params =  params.append('search',this.search)
		}
    this.api.getByParams(this.HostURL+this.UserULR,params).subscribe(data => {
      console.log("This is subscription plan data------->",data);
      this.dataMamber=data
      this.count=this.dataMamber.data.count
      console.log("this is subscription plan dataMamaber--------->",this.dataMamber.data)
    })
  }

//This is for pagination
  onTableDataChange(event: any) {
    this.router.navigate(['user'], { queryParams: {event: event } });
    this.page = event;
    this.skip=(this.page-1)*this.limit
    this.getData();
  }
//Active and Deactive the user
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
