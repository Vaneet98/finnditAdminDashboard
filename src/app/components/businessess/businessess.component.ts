import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ServiceService } from 'src/app/service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component'
@Component({
  selector: 'app-root',
  templateUrl: './businessess.component.html',
  styleUrls: ['./businessess.component.css'],
})
export class BusinessessComponent implements OnInit {
  title = 'angularCRUD';

  displayedColumns: string[] = [
    'productName',
    'category',
    'date',
    'productFreshness',
    'price',
    'comment',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ServiceService,  private toastr: ToastrService) {}
  ngOnInit(): void {
    this.getProduct();
  }
  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getProduct();
        }
      });
  }
  dataMamber=[
    {id:1,productName:"Vaneet kumar",category:"Test", date: "2023-01-16T18:30:00.000Z",productFreshness:"Test11",price:50,comment:"test"},
    {id:2,productName:"Vaneet kumar",category:"Test", date: "2023-01-16T18:30:00.000Z",productFreshness:"Test11",price:50,comment:"test"},
    {id:3,productName:"Vaneet kumar",category:"Test", date: "2023-01-16T18:30:00.000Z",productFreshness:"Test11",price:50,comment:"test"},
    {id:4,productName:"Vaneet kumar",category:"Test", date: "2023-01-16T18:30:00.000Z",productFreshness:"Test11",price:50,comment:"test"},
    {id:5,productName:"Vaneet kumar",category:"Test", date: "2023-01-16T18:30:00.000Z",productFreshness:"Test11",price:50,comment:"test"},
    {id:6,productName:"Vaneet kumar",category:"Test", date: "2023-01-16T18:30:00.000Z",productFreshness:"Test11",price:50,comment:"test"},

  ]
  getProduct() {
    // this.dataSource = new MatTableDataSource(this.dataMamber);
  
    return this.api.getProduct().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        this.toastr.error("Error occured")
      },
    });
  }

  viewProduct(row:any){
    alert(JSON.stringify(row));
    
  }

  deleteProduct(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.deleteProduct(id).subscribe({
          next: (res) => {
            this.toastr.success("Delete successfully")
            this.getProduct();
            console.log(res);
          },
          error: () => {
            this.toastr.error("Something went wrong in deletion")
          },
        });
      }
    });
  }

  editProduct(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Updated') {
          this.getProduct();
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
