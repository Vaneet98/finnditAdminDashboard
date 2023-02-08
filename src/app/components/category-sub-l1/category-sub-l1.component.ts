import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit,ElementRef ,ViewChild, Input} from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import {NgForm} from "@angular/forms"
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-category-sub-l1',
  templateUrl: './category-sub-l1.component.html',
  styleUrls: ['./category-sub-l1.component.css']
})
export class CategorySubL1Component implements OnInit {
  HostURL=environment.hostULR
  SubcategoryL1URL=environment.SubcategoryL1URL
  // @Input() categoryId:any;
  L1id:any
  id:any
  form: FormGroup | undefined;
  isFormValid:any = false;
  basicForm: any;
  constructor(private elementRef: ElementRef,private router:Router,
    private toastr: ToastrService,private api: ServiceService,private route: ActivatedRoute) { 
  }
  pagePerItem=0
  ngOnInit(): void {
    this.pagePerItem=5
    this.route.params.subscribe(params => {
      this.L1id = params['id'];
    });
    console.log("THis is parameter id",this.L1id)
    this.getDataOfSubCateL1(this.L1id)
  }

dataMamber:any 
  searchText = '';
  
 userId:any
  getId(id:any){
     console.log("this is data",JSON.stringify(id))
     alert(JSON.stringify(id))
     this.userId=id
  }

  moveTol2(id:any){
    // this.router.navigate(['CategorySubL1Component/c1'+'?'+this.L1id+'c2'], { queryParams: {id: id } });
    this.router.navigate(['CategorySubL1Component/c1/'+this.L1id+'/c2/'+id]);
  }


 public getDataOfSubCateL1(id:any){
    this.api.getById(this.HostURL+this.SubcategoryL1URL+id).subscribe(data => {
      console.log("This is SubcategorireL1 data------->",data);
      this.dataMamber=data
      console.log("this is dataMamaber of subCategoryL1--------->",this.dataMamber.data.rows)
    })
  }

  getbacktocategory(){
    this.router.navigate(['/categories']);
  }

  selectedRowDetail(data:any){
    alert(JSON.stringify(data))
  }
  p = 1;
 
  loadDataPage(event: PageEvent) {
    this.pagePerItem=event.pageSize
}

  getdataEdit(form:any){
    form.userId=this.userId.id
    console.log("This is  ----------->",form)
    this.toastr.success('Edit data Successfully.');
  }


  deactivateValue:any={}
  deactivate(){
    this.userId
    this.deactivateValue.userId=this.userId
    this.deactivateValue.value=1
    console.log(this.deactivateValue)
    this.toastr.success('Deactivate data Successfully.');
  }

  deleteAt:any={}
  deleteData(){
    this.userId
    this.deleteAt.userId=this.userId
    this.deleteAt.value=1
    console.log("This is deleted",this.deleteAt)
    this.toastr.success('Deleted data Successfully.');
  }
}
