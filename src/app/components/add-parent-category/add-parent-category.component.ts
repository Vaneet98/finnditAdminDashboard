import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-parent-category',
  templateUrl: './add-parent-category.component.html',
  styleUrls: ['./add-parent-category.component.css']
})
export class AddParentCategoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddParentCategoryComponent>) { }
  profileImage: string|any;
  defaultImage = 'assets/img/vaneet.jpeg';
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onFileSelected(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.profileImage = reader.result as string;
    };
  }
}
