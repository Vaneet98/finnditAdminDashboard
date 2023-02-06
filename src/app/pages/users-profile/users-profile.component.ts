import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl, } from "@angular/forms";
import { ServiceService } from '../../service.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { NoWhitespaceValidator } from 'src/app/NoWhiteSpacevalidator';
@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  HostURL=environment.hostULR
  editAdminURL=environment.editAdminURL
  getAdmin=environment.getAdmin
  changePasswordAdmin=environment.changePassword
  firstName: any;
  lastName:any;
  phoneNumber:any;
  email:any
  job:any
  countryCode:any
  createdAt:any
  role:any=[]
  registrationDate:any
  addressLine1:any
  addressLine2:any
  id:any
  response:any
  public form: FormGroup |any;
  profileImage: string|any;
  defaultImage = 'assets/img/vaneet.jpeg';
  getEmail:any
  statusValue:any
  changeStatusValue:any
  showError=false
  public changePassword:FormGroup|any
  constructor(private api: ServiceService,private toastr: ToastrService,
    private router: Router,private formBuilder: FormBuilder) {
      this.changePassword = this.formBuilder.group({
        password: ['', [Validators.required]],
        oldPassword: ['', [Validators.required]],
        renewPassword: ['', [Validators.required]]
      });
      this.form = this.formBuilder.group({
        firstName: ["", Validators.compose([Validators.required,NoWhitespaceValidator,Validators.maxLength(20)])],
        lastName:["",Validators.compose([Validators.required,NoWhitespaceValidator,Validators.maxLength(15)])],
        phoneNumber:["",Validators.compose([Validators.required,Validators.maxLength(10)])],
        countryCode:["",Validators.compose([Validators.required])],
        image:['',Validators.compose([Validators.required])]
      });
     }

  ngOnInit(): void {
    let d:any=localStorage.getItem("jwt")
    const jwt = JSON.parse(d);
    console.log("This is token",jwt)
    if (jwt) {
      this.id=jwt.data.adminDetails.id
      console.log("This is id--",this.id)
      this.getAdminDetail()
      this.role=jwt.data.adminDetails.role.role_permissions
    }
    console.log("this is role--------------------->>>",this.role)
    
  }
  patchValue(){
    this.form.patchValue({
      firstName: this.response.data.firstName,
      lastName:this.response.data.lastName,
      phoneNumber:this.response.data.phoneNumber,
      countryCode:this.response.data.countryCode,
    });
  }

  getAdminDetail(){
    this.api.getById(this.HostURL+this.getAdmin+'/'+this.id).subscribe( (res)=>{
      console.log("This is respone------>",res)
         this.response=res
         this.role=this.response.data.role.role_permissions
         console.log("This is role-&&&&&&&&&&&&&&&------>",this.role)
    })
  }


  onFileSelected(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.profileImage = reader.result as string;
    };
  }

  editdata(){
  console.log("This is form value of edit ------>",this.form.value)
  console.log("This is form value of valid ------>",this.form.valid)
  if(this.form.valid){
    this.api.edit(this.HostURL+this.editAdminURL,this.form.value).subscribe((res)=>{
      this.statusValue=res
      console.log("This is response from server side-------->",this.statusValue)
      if(this.statusValue.statusCode==200){
        this.toastr.success('Admin profile edit Successfully.');
        this.getAdminDetail()
        setTimeout(() => {
             this.patchValue()
            }, 1000)
         }  
        })
  }else{
    this.showError = true
			setTimeout(() => { this.showError = false }, 5000)
  }
   }

   changepassword(){
    console.log("This is form value of reset password ------>",this.changePassword.value)
      if(this.changePassword.value.password!==this.changePassword.value.renewPassword){
       this.toastr.error("New password and renewPassword not same")
      }
     else if(this.changePassword.value.password==this.changePassword.value.renewPassword){
        delete this.changePassword.value.renewPassword
        this.api.edit(this.HostURL+this.changePasswordAdmin,this.changePassword.value).subscribe((res)=>{
       this.changeStatusValue=res
        if(this.changeStatusValue.statusCode===200){
         this.toastr.success("Password changed successfully")
        }
      })
    }
  }

}
