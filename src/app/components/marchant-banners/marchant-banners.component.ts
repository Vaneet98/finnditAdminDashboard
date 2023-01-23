import { Component, OnInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-marchant-banners',
  templateUrl: './marchant-banners.component.html',
  styleUrls: ['./marchant-banners.component.css']
})
export class MarchantBannersComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}
