import { Component, OnInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-lisiting',
  templateUrl: './lisiting.component.html',
  styleUrls: ['./lisiting.component.css']
})
export class LisitingComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
