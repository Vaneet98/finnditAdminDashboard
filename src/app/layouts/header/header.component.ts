import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  HostURL=environment.hostULR
  logoutURL=environment.logoutURL;
  fname: any;
  lname:any;
  phoneNumber:any;
  email:any
  profileImage: string|any;
  defaultImage = 'assets/img/vaneet.jpeg';
  constructor(@Inject(DOCUMENT) private document: Document,private toastr: ToastrService,private api: ServiceService) { }
  
  ngOnInit(): void {
    let d:any=localStorage.getItem("jwt")
    const jwt = JSON.parse(d);
    console.log("This is token",jwt)
    if (jwt) {
      this.fname = jwt.data.adminDetails.firstName;
      this.lname=jwt.data.adminDetails.lastName;
      this.phoneNumber=jwt.data.adminDetails.phoneNumber;
      this.email=jwt.data.adminDetails.email
    }
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  logout(){
    // localStorage.clear()
    localStorage.removeItem("jwt")
    localStorage.removeItem("userPermissions")
    localStorage.removeItem("type")
    if(localStorage.getItem("email")=='')
    {
      localStorage.clear()
    }
    this.api.logoutuser(this.HostURL+this.logoutURL)
    this.toastr.success('Logged Out Successfully.');
  }
}
