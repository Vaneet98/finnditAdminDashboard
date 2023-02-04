import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service'
import { environment } from 'src/environments/environment';
// import { ToastrService } from 'ngx-toastr';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl, } from "@angular/forms";

@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class PagesRegisterComponent implements OnInit {
  HostURL=environment.hostULR
  RegisterURL=environment.RegisterURL
  commanRoleURL=environment.commanRoleURL
  roleList:any=[];
  public form: FormGroup |any;
  constructor(private api: ServiceService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getcommonRoles()
    this.form = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      password: ["", Validators.compose([Validators.required])],
      adminType:["",Validators.compose([Validators.required])],
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    });
  }

  role:any
  getcommonRoles() {
    this.api.getAll(this.HostURL+this.commanRoleURL)
      .subscribe((res) => {
        this.role=res
        console.log("This is role----->",this.role)
      this.roleList=this.role.data.rows
      },
      err => {
        console.log(err.error.message, "errr")
      })
  }
  getdata(){
  //   console.log(data,"data value") 
  //   this.api.register(data).subscribe({

  //  next:(res)=>{
  //   console.log("This is res",res)
  //   // this.toastr.success('Hello world!', 'Toastr fun!');
  //  },
  //  error:(err)=>{
  //   console.log("This is error",err)
  //  }
  //   })
  }

}
