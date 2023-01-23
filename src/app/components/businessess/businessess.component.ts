import { Component, OnInit, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-businessess',
  templateUrl: './businessess.component.html',
  styleUrls: ['./businessess.component.css']
})
export class BusinessessComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
  dataMamber=[
    {id:1,name:"Brandon Jacob",fullname:"Subscription",ownerName:"ABC",contactNumber:"-",designation:"Designer",phoneNumber:"123242332",registerType:"XYZ",category:"test",subcategory:"test1",claim:"Non",subscriptionPlan:"Test",approvalStatus:"Panding",status:"Active"},
    {id:2,name:"Brandon Jacob",fullname:"Subscription",ownerName:"ABC",contactNumber:"-",designation:"Designer",phoneNumber:"123242332",registerType:"XYZ",category:"test",subcategory:"test1",claim:"Non",subscriptionPlan:"Test",approvalStatus:"Approved",status:"Active"}, {id:3,name:"Brandon Jacob",fullname:"Subscription",ownerName:"ABC",contactNumber:"-",designation:"Designer",phoneNumber:"123242332",registerType:"XYZ",category:"test",subcategory:"test1",claim:"Non",subscriptionPlan:"Test",approvalStatus:"Panding",status:"Active"}, {id:4,name:"Brandon Jacob",fullname:"Subscription",ownerName:"ABC",contactNumber:"-",designation:"Designer",phoneNumber:"123242332",registerType:"XYZ",category:"test",subcategory:"test1",claim:"Non",subscriptionPlan:"Test",approvalStatus:"Panding",status:"Active"}, {id:5,name:"Brandon Jacob",fullname:"Subscription",ownerName:"ABC",contactNumber:"-",designation:"Designer",phoneNumber:"123242332",registerType:"XYZ",category:"test",subcategory:"test1",claim:"Non",subscriptionPlan:"Test",approvalStatus:"Approved",status:"Active"}, {id:6,name:"Brandon Jacob",fullname:"Subscription",ownerName:"ABC",contactNumber:"-",designation:"Designer",phoneNumber:"123242332",registerType:"XYZ",category:"test",subcategory:"test1",claim:"Non",subscriptionPlan:"Test",approvalStatus:"Panding",status:"Active"}, {id:7,name:"Brandon Jacob",fullname:"Subscription",ownerName:"ABC",contactNumber:"-",designation:"Designer",phoneNumber:"123242332",registerType:"XYZ",category:"test",subcategory:"test1",claim:"Non",subscriptionPlan:"Test",approvalStatus:"Approved",status:"Active"}, {id:8,name:"Brandon Jacob",fullname:"Subscription",ownerName:"ABC",contactNumber:"-",designation:"Designer",phoneNumber:"123242332",registerType:"XYZ",category:"test",subcategory:"test1",claim:"Non",subscriptionPlan:"Test",approvalStatus:"Panding",status:"Active"},
    
  ]

  searchTerm: any;
  filterData() {
    return this.dataMamber.filter(data => {
        return data.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
}
}
