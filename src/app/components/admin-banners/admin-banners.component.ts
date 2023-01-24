import { Component, OnInit, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-admin-banners',
  templateUrl: './admin-banners.component.html',
  styleUrls: ['./admin-banners.component.css']
})
export class AdminBannersComponent implements OnInit {
  constructor(private elementRef: ElementRef) { }
  selectedDataMember: any;

  onRowClick(data:any):void {
    // this.selectedDataMember=dataMember
    // let message = '';
    // for (let prop in dataMember) {
    //   message += prop.toUpperCase() + ': ' + dataMember[prop] + '\n';
    // }
    // alert(message);
    console.log("this is admin banner")
    alert(data);
  }
  ngOnInit(): void {


    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
  dataMamber=[
    {displayName:"Ashoka",placement:"HomePage",position:"1",frequency:"5",startDate:"2022-01-01",endDate:"2022-03-03",status:"Approved"},
    {displayName:"Ashoka",placement:"HomePage1",position:"2",frequency:"6",startDate:"2022-01-01",endDate:"2022-03-03",status:"Approved"},
    {displayName:"Ashoka",placement:"HomePage2",position:"3",frequency:"7",startDate:"2022-01-01",endDate:"2022-03-03",status:"Panding"},
    {displayName:"Ashoka",placement:"HomePage3",position:"4",frequency:"8",startDate:"2022-01-01",endDate:"2022-03-03",status:"Approved"},
    {displayName:"Ashoka",placement:"HomePage4",position:"1",frequency:"9",startDate:"2022-01-01",endDate:"2022-03-03",status:"Approved"},
    {displayName:"Ashoka",placement:"HomePage5",position:"17",frequency:"3",startDate:"2022-01-01",endDate:"2022-03-03",status:"Panding"},
    {displayName:"Ashoka",placement:"HomePage6",position:"5",frequency:"2",startDate:"2022-01-01",endDate:"2022-03-03",status:"Approved"},
    {displayName:"Ashoka",placement:"HomePage7",position:"1",frequency:"5",startDate:"2022-01-01",endDate:"2022-03-03",status:"Approved"},
    {displayName:"Ashoka",placement:"HomePage8",position:"1",frequency:"15",startDate:"2022-01-01",endDate:"2022-03-03",status:"Approved"},
    {displayName:"Ashoka",placement:"HomePage9",position:"3",frequency:"52",startDate:"2022-01-01",endDate:"2022-03-03",status:"Approved"},
    {displayName:"Ashoka",placement:"HomePage2",position:"1",frequency:"5",startDate:"2022-01-01",endDate:"2022-03-03",status:"Panding"},
    {displayName:"Ashoka",placement:"HomePage",position:"7",frequency:"7",startDate:"2022-01-01",endDate:"2022-03-03",status:"Approved"},
    {displayName:"Ashoka",placement:"HomePage3",position:"1",frequency:"5",startDate:"2022-01-01",endDate:"2022-03-03",status:"Approved"},
    {displayName:"Ashoka",placement:"HomePage3",position:"8",frequency:"4",startDate:"2022-01-01",endDate:"2022-03-03",status:"Panding"},
    {displayName:"Ashoka",placement:"HomePage3",position:"1",frequency:"8",startDate:"2022-01-01",endDate:"2022-03-03",status:"Approved"},
  ]
 
}  
