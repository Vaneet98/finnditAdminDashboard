import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
type:any
permission:any
  constructor() { }
ViewTag=true
  ngOnInit(): void {
    this.type=localStorage.getItem('type')
  //   this.permission=localStorage.getItem('userPermissions')
  //   console.log("This is sidebar jwt",this.permission)
  //   for(let data of this.permission.data.permissions.role_permissions){
  //     if (data.permission.name=="view Tags") {
  //       this.ViewTag=true
  //     }
  // } 
  }
  setTypelocalstorage(){
    localStorage.setItem('type',this.type)
  }
}
