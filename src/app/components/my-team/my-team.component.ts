import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/service.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router,ActivatedRoute  } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService,Spinner } from 'ngx-spinner';
@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {

  constructor(private elementRef: ElementRef,private toastr: ToastrService,
    private api: ServiceService,private fb: FormBuilder,private dialog: MatDialog,
    private router:Router,private route: ActivatedRoute,private spinner:NgxSpinnerService) { }
  HostURL=environment.hostULR
  myTeam=environment.myTeamURL
  getAdmin=environment.getAdmin
  teamForm: FormGroup | any;
  page: number=1;
  count: number = 0;
  tableSize: number = 5;
  search = '';
  sortOrder ='DESC'
  limit=100
  skip=0
  ngOnInit(): void {
    // this.getData()
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      email:['', Validators.required],
      phoneNumber:['', Validators.required],
      role:['', Validators.required],
      admin_tags:['', Validators.required],
    });
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

//This is for close the popup window
@ViewChild('closebutton') closebutton: any;

public onSave() {
  this.closebutton.nativeElement.click();
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
      this.teamForm.reset()
    }else{
      let tagData:any=[]
		for(let i = 0 ; i < data.admin_tags.length ; i++){
			tagData.push(data.admin_tags[i].tag)
		}
      this.teamForm.patchValue({
        name: data.firstName,
        email: data.email ,
        phoneNumber:data.phoneNumber ,
        // role: JSON.stringify(tagData),
        admin_tags:data.admin_tags ,
      });
    }
  }

  //For searching
 onTextChange(value: any) {
  this.search = value;
  this.getData();
}

//This is for pagination
onTableDataChange(event: any) {
  this.router.navigate(['myteam'], { queryParams: {event: event } });
  this.page = event;
  // this.skip=(this.page-1)*this.limit
  this.getData();
}

changeSortOrder(value: any): void {
  this.sortOrder = this.sortOrder === 'DESC' ? 'ASC' : 'DESC';
  this.getData();
}

  dataMamber:any
  getData(){
    this.spinner.show()
    let params = new HttpParams();
    params = params.set('limit', this.limit); 
    params = params.set('skip', this.skip);
    params = params.append('orderBy',this.sortOrder)
    if(this.search != null && this.search != ''){
			params =  params.append('search',this.search)
		}
    this.api.getByParams(this.HostURL+this.getAdmin,params).subscribe(data => {
      console.log("This is my team data------->",data);
      this.dataMamber=data
      console.log("this is my team dat dataMamaber--------->",this.dataMamber.data.rows)
    })
  }

  editTeam(data:any){

  }
  statusVal:any
  deleteMyteam(id: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    const data = {
      "id": id
    }
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.delete(this.HostURL+this.myTeam,data).subscribe({
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
