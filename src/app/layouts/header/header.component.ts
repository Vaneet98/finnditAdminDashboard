import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  fname: any;
  lname:any;
  constructor(@Inject(DOCUMENT) private document: Document,private toastr: ToastrService) { }
  
  ngOnInit(): void {
    let d:any=localStorage.getItem("jwt")
    const jwt = JSON.parse(d);
    if (jwt) {
      this.fname = jwt.data.adminDetails.firstName;
      this.lname=jwt.data.adminDetails.lastName;
    }
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  logout(){
    localStorage.clear()
    this.toastr.success('Logged Out Successfully.');
  }
}
