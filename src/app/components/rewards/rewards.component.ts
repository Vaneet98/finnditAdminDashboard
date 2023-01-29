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
