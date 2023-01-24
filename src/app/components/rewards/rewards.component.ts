import { Component, OnInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {
  public selectedTab: "one" | "two"
  constructor(private elementRef: ElementRef) { 
    this.selectedTab = "one";
  }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
dataMamber=[
  {title:"Reward",category:"Reward Category",type:"Self",redeemPoint:"200",expirDate:"2022-10-10",status:"Panding"}
]
dataMamberCategory=[
  {category:"Reward Category",title:"Test",status:"Approved"}
]
public show( tab: "one" | "two" ) : void {
  this.selectedTab = tab;
}
}
