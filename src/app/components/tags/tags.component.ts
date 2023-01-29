import { Component, OnInit,ElementRef } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  public selectedTab: "one" | "two"
  constructor(private elementRef: ElementRef,private api: ServiceService) { 
    this.selectedTab = "one";
  }


  ngOnInit(): void {
    this.getDataAdminTage()
    this.getDataMarchantTage()
  }
  dataMamber:any;
  dataMamaberMarchant:any
  // dataMamber=[
  //   {name:"Reward",assignedTo:"Reward Category"}
  // ]
  // dataMamberCategory=[
  //   {name:"Reward222",assignedTo:"Reward Category"}
  // ]


  getDataAdminTage(){
    this.api.getTage("1").subscribe(data => {
      console.log("This is tageAdmin data------->",data);
      this.dataMamber=data
      console.log("this is tageAdmin dataMamaber--------->",this.dataMamber.data.rows)
    })
  }

  getDataMarchantTage(){
    this.api.getTage("2").subscribe(data => {
      console.log("This is tageAdmin data------->",data);
      this.dataMamaberMarchant=data
      console.log("this is tageAdmin dataMamaber--------->",this.dataMamaberMarchant.data.rows)
    })
  }
 
  public show( tab: "one" | "two" ) : void {
    this.selectedTab = tab;
  }

}
