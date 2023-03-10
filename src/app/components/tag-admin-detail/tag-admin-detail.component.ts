import { Component, OnInit,ElementRef ,ViewChild, Input} from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service'
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-tag-admin-detail',
  templateUrl: './tag-admin-detail.component.html',
  styleUrls: ['./tag-admin-detail.component.css']
})
export class TagAdminDetailComponent implements OnInit {
  HostURL=environment.hostULR
  UnassignedURL=environment.UnassignedURL;
  TagAdminDetailURL=environment.TagAdminDetailURL;
  @Input() categoryId:any;
  form: FormGroup | undefined;
  isFormValid:any = false;
  basicForm: any;
  type: any;
  tagId: any;
  constructor(private elementRef: ElementRef,private router:Router,
    private toastr: ToastrService,private api: ServiceService,private route: ActivatedRoute) { 
  }
  pagePerItem=0
  data:{}|any
  ngOnInit(): void {
    this.pagePerItem=5
    this.route.params.subscribe(params => {
      this.tagId = params['tagId'];
      this.type=params['typeId']
    });
    this.getDataOfTageAdminDetail(this.type,this.tagId)
  }

  dataMamber:any 
  searchText = '';
  
 admintagId:any
  getdata(data:any){
     this.admintagId=data
  }

  getDataOfTageAdminDetail(type:any,tagId:any){
    let params = new HttpParams();
    params = params.set('type', type.toString());
    params = params.set('tagId', tagId);
    this.api.getByParams(this.HostURL+this.TagAdminDetailURL,params).subscribe(data => {
      this.dataMamber=data
      if(this.type==1){
        this.dataMamber=this.dataMamber.data.rows
      }
      else if(this.type==2){
        this.dataMamber=this.dataMamber.data.rows.rows
      }
    })
  }

  getbacktoTag(){
    this.router.navigate(['/tags']);
  }

  selectedRowDetail(data:any){
    alert(JSON.stringify(data))
  }
  p = 1;
  loadDataPage(event: PageEvent) {
    this.pagePerItem=event.pageSize
}
UnassignedValue:any={}
  Unassigned(){
    this.UnassignedValue={
      type:this.type,
      tagId:this.admintagId.tagId,
      userId:this.admintagId.adminId
    }
    this.api.edit(this.HostURL+this.UnassignedURL,this.UnassignedValue)
    this.toastr.success('Unassigned data Successfully.');
  }
}
