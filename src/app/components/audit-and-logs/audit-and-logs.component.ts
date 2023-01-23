import { Component, OnInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-audit-and-logs',
  templateUrl: './audit-and-logs.component.html',
  styleUrls: ['./audit-and-logs.component.css']
})
export class AuditAndLogsComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
