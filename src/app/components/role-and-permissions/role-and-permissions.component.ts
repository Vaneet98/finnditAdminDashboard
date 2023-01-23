import { Component, OnInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-role-and-permissions',
  templateUrl: './role-and-permissions.component.html',
  styleUrls: ['./role-and-permissions.component.css']
})
export class RoleAndPermissionsComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
