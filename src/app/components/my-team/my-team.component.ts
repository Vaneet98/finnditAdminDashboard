import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/service.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {

  constructor(private elementRef: ElementRef,private toastr: ToastrService,private api: ServiceService,private fb: FormBuilder,private dialog: MatDialog) { }
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
