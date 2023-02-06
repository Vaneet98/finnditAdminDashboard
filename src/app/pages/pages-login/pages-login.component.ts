import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms"
import { ServiceService } from '../../service.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { environment } from 'src/environments/environment';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl, } from "@angular/forms";
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {
  HostURL=environment.hostULR
  LoginURL= environment.LoginURL;
  commanRoleURL=environment.commanRoleURL
  public form: FormGroup |any;
  users: any;
  rememberMe = false;
  isRemember = false;
  type:any=1
  roleList:any=[];
  public resetPasswordForm: FormGroup|any;
  showError = false;
  secretKey='Vaneet.k@applify.co'
  isLogin = "login";
  constructor(private api: ServiceService,private toastr: ToastrService,private router: Router,private formBuilder: FormBuilder,) { 
    this.form = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required,Validators.pattern('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')])],
      password: ["", Validators.compose([Validators.required])],
      adminType:["",Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
    this.api.reloadComponent();
    this.getcommonRoles()
    this.form = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      password: ["", Validators.compose([Validators.required])],
      adminType:["",Validators.compose([Validators.required])]
    });
    let rememberMe = localStorage.getItem("rememberMe");
    console.log("remberme----->",rememberMe)
    if (rememberMe==="1") {
      let email=localStorage.getItem("email")
      console.log("email----->",email)
      let password=localStorage.getItem("password")
      this.decryptUsingAES256(password)
      this.form.patchValue({
        email: email,
      });
      this.isRemember = true;
      this.rememberMe = true;
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      this.isRemember = false;
      this.rememberMe = false;
    }
  }
  role:any
  getcommonRoles() {
    let params = new HttpParams()
    params = params.append('type', 1);
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

  setValue:any
  getdata(){
    if(this.form.valid){
      this.api.add(this.HostURL+this.LoginURL,this.form.value)
      .subscribe(async (res) => {
        this.setValue=res
        localStorage.setItem('type',this.type)
        localStorage.setItem("jwt", JSON.stringify(this.setValue))
        localStorage.setItem('userPermissions',JSON.stringify(this.setValue.data.adminDetails?.role.role_permissions)
        );
        this.toastr.success("Login successful!");
        // this.form.reset();
        if (this.rememberMe) {
          const encryptedPassword: any = await this.encryptUsingAES256(
            this.form.value.password
          );
          localStorage.setItem("rememberMe", "1")
          localStorage.setItem("email", this.form.value.email)
          localStorage.setItem('password', encryptedPassword.toString());
        } else {
          localStorage.setItem("rememberMe", "0")
          localStorage.setItem("email", "")
          localStorage.setItem("password", "")
        }
        setTimeout(() => {
          this.router.navigate(['dashboard']);
        }, 100,
       );
        return false;
      },
        )
    }
    else {
      this.showError = true;
    }
  }

    changeRememberMe(event:any) {
      this.rememberMe = event.target.checked; 
    }

  // Encryption Functionality
  encryptUsingAES256(value: any) {
    return new Promise((resolve, reject) => {
      let ciphertext = AES.encrypt(value, this.secretKey);
      resolve(ciphertext);
    });
  }

  // Decryption Functionality
  decryptUsingAES256(value:any) {
    let bytes = AES.decrypt(value.toString(), this.secretKey);
    let plaintext = bytes.toString(enc.Utf8);
    this.form.patchValue({
      password: plaintext,
    });
  }

}
