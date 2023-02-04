import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl, } from "@angular/forms";
import { ServiceService } from '../../service.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  HostURL=environment.hostULR
  editAdminURL=environment.editAdminURL
  getAdmin=environment.getAdmin
  firstName: any;
  lastName:any;
  phoneNumber:any;
  email:any
  job:any
  countryCode:any
  createdAt:any
  role:any
  registrationDate:any
  addressLine1:any
  addressLine2:any
  id:any
  public form: FormGroup |any;
  constructor(private api: ServiceService,private toastr: ToastrService,private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let d:any=localStorage.getItem("jwt")
    const jwt = JSON.parse(d);
    console.log("This is token",jwt)
    // this.getAdminDetail()
    if (jwt) {
      this.id=jwt.data.adminDetails.id
      console.log("This is id--",this.id)
      this.getAdminDetail()
      this.role=jwt.data.adminDetails.role.role_permissions
    }
    console.log("this is role--------------------->>>",this.role)
    this.form = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      firstName: ["", Validators.compose([Validators.required])],
      lastName:["",Validators.compose([Validators.required])],
      job:["",Validators.compose([Validators.required])],
      phoneNumber:["",Validators.compose([Validators.required])],
      countryCode:["",Validators.compose([Validators.required])],
      addressLine1:["",Validators.compose([Validators.required])],
      addressLine2:["",Validators.compose([Validators.required])],
    });
  }
  patchValue(){
    this.form.patchValue({
      firstName: this.firstName,
      lastName:this.lastName,
      job:this.job,
      phoneNumber:this.phoneNumber,
      email:this.email,
      countryCode:this.countryCode,

    });
  }
 response:any
  getAdminDetail(){
    this.api.getById(this.HostURL+this.getAdmin+'/'+this.id).subscribe((res)=>{
      console.log("This is respone------>",res)
         this.response=res
         this.firstName=this.response.data.firstName,
         this.lastName=this.response.data.lastName,
         this.phoneNumber=this.response.data.phoneNumber,
         this.email=this.response.data.email,
         this.job=this.response.data.role.name,
         this.countryCode=this.response.data.countryCode,
         this.createdAt=this.response.data.createdAt,
         this.role=this.response.data.role,
         this.registrationDate=this.response.data.registrationDate
         this.addressLine1=this.response.data.addressLine1
         this.addressLine2=this.response.data.addressLine2
    })
  }

  profileImage: string|any;
  defaultImage = 'assets/img/vaneet.jpeg';
  onFileSelected(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.profileImage = reader.result as string;
    };
  }
statusValue:any
  editdata(){
    delete this.form.value.job
    delete this.form.value.addressLine1
    delete this.form.value.addressLine2
  console.log("This is form value of edit ------>",this.form.value)
  this.api.edit(this.HostURL+this.editAdminURL,this.form.value).subscribe((res)=>{
    this.statusValue=res
    console.log("This is response",this.statusValue)
    if(this.statusValue.statusCode==200){
      this.toastr.success('Admin profile edit Successfully.');
      this.patchValue()
      this.getAdminDetail()
    }
  
  })
  }

}
