import { Component, OnInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-audit-and-logs',
  templateUrl: './audit-and-logs.component.html',
  styleUrls: ['./audit-and-logs.component.css']
})
export class AuditAndLogsComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

  }
  searchText = '';
  people = [
    {id:1, name: 'John Doe', age: 25, email: 'john@example.com' },
    {id:2, name: 'Jane Smith', age: 32, email: 'jane@example.com' },
    {id:3, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:4, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:5, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:6, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:7, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:8, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:9, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:10, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:11, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:12, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:13, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:14, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:15, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:16, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:17, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    { id:18,name: 'Bob Williams', age: 45, email: 'bob@example.com' },
    {id:19, name: 'Bob Williams', age: 45, email: 'bob@example.com' },
  ];
  p = 1;

  getId(id:number){
    alert(id)
  }
}
