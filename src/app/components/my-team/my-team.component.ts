import { Component, OnInit,ElementRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/service.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { DefaultMatCalendarRangeStrategy } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {

  constructor(private elementRef: ElementRef,private toastr: ToastrService,private api: ServiceService,private fb: FormBuilder) { }
  HostURL=environment.hostULR
  myTeam=environment.myTeamURL
  teamForm: FormGroup | any;
  ngOnInit(): void {
    this.pagePerItem=5
    this.getData()
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      email:['', Validators.required],
      phoneNumber:['', Validators.required],
      role:['', Validators.required],
      admin_tags:['', Validators.required],
    });
  }
  p = 1;
  searchText = '';
  pagePerItem=0
  loadDataPage(event: PageEvent) {
    this.pagePerItem=event.pageSize
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

  dataMamber:any
  getData(){
    this.api.getAll(this.HostURL+this.myTeam).subscribe(data => {
      console.log("This is my team data------->",data);
      this.dataMamber=data
      console.log("this is my team dat dataMamaber--------->",this.dataMamber.data.rows)
    })
  }

  editTeam(data:any){

  }
  statusVal:any
  deleteTeam(){
    this.api.delete(this.HostURL+this.myTeam,this.teamIds).subscribe((val)=>{
      if(val){
        this.statusVal=val
        if(this.statusVal.statusCode===200){
          this.toastr.success('Deleted data Successfully.');
          this.getData()
        }
      }
    })
  }
}
