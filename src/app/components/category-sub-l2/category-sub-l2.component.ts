import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit,ElementRef ,ViewChild, Input} from '@angular/core';
import { Router,ActivatedRoute ,NavigationEnd } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-category-sub-l2',
  templateUrl: './category-sub-l2.component.html',
  styleUrls: ['./category-sub-l2.component.css']
})
export class CategorySubL2Component implements OnInit {
  HostURL=environment.hostULR
  SubcategoryL2URL=environment.SubcategoryL2URL
  @Input() categoryId:any;
  form: FormGroup | undefined;
  isFormValid:any = false;
  basicForm: any;
  L1id:any
  event:any
  page: number=1;
  count: number = 0;
  tableSize: number = 5;
  search = '';
  limit=5
  skip=0
  sortOrder ='DESC'
  dataMamber:any 
 userId:any
 id:any
 deactivateValue:any={}
 deleteAt:any={}
  constructor(private elementRef: ElementRef,private router:Router,
    private toastr: ToastrService,private api: ServiceService,private route: ActivatedRoute) { 
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log("This is params of subCategoryl2=====-------->",params)
      console.log("This is params========>",params)
      this.L1id= params['L1id']
      this.id = params['id'];
      this.event=params['event']
    });
    console.log("THis is parameter L1id----------->",this.L1id)
    console.log("THis is parameter id----------->",this.id)
    this.getDataOfSubCateL2(this.id)
  }


      //For searching
      onTextChange(value: any) {
        this.search = value;
        this.getDataOfSubCateL2(this.id);
      }
      
      //This is for pagination
      onTableDataChange(event: any) {
        this.router.navigate(['CategorySubL1Component/l2/'], { queryParams: {event:this.event,L1id:this.L1id,id:this.id } });
        this.page = event;
        this.skip=(this.page-1)
        this.getDataOfSubCateL2(this.id);
      }
      
      changeSortOrder(value: any): void {
        this.sortOrder = this.sortOrder === 'DESC' ? 'ASC' : 'DESC';
        this.getDataOfSubCateL2(this.id);
      }

  getId(id:any){
     console.log("this is data",JSON.stringify(id))
     alert(JSON.stringify(id))
     this.userId=id
  }


 public getDataOfSubCateL2(id:any){
    this.api.getById(this.HostURL+this.SubcategoryL2URL+id).subscribe(data => {
      console.log("This is SubcategorireL2 data------->",data);
      this.dataMamber=data
      console.log("this is dataMamaber of subCategoryL2--------->",this.dataMamber.data.rows)
    })
  }

  getbacktosubcategoryl1(){
    this.router.navigate(['/CategorySubL1Component/'],{ queryParams: {event:this.event,L1id: this.L1id } });
  }

  selectedRowDetail(data:any){
    alert(JSON.stringify(data))
  }


  getdataEdit(form:any){
    form.userId=this.userId.id
    console.log("This is  ----------->",form)
    this.toastr.success('Edit data Successfully.');
  }



  deactivate(){
    this.userId
    this.deactivateValue.userId=this.userId
    this.deactivateValue.value=1
    console.log(this.deactivateValue)
    this.toastr.success('Deactivate data Successfully.');
  }

 
  deleteData(){
    this.userId
    this.deleteAt.userId=this.userId
    this.deleteAt.value=1
    console.log("This is deleted",this.deleteAt)
    this.toastr.success('Deleted data Successfully.');
  }
}
