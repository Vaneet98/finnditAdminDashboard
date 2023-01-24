import { Component, OnInit, ElementRef} from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
  dataMamber=[
    {name:"vaneet kumar",email:"vaneet.k@applify.co",phoneNumber:"123456789",location:"Mohali",tier:"Horizontal",pointEarned:"25",pointRedeemed:"10",registerOn:"2022-04-07",status:"Approved"}
  ]
}
