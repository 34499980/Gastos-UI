
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Inject, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Category } from '../../../models/models';
import { CategryService } from '../../../services/category.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogConfirm } from '../../../dialogs/confirm/dialog-confirm';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  standalone: true,
  imports: [MatListModule, NgFor, NgIf,MatButtonModule, MatTableModule, MatIconModule, MatDialogModule ]
})
export default class CategoriesListComponent implements OnInit {
  categoryService = inject(CategryService);
  public dialogService = inject(MatDialog);
  list: Category[];
  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['image', 'name', 'actions'];

  ngOnInit(): void {
    console.log('Entra')
    this.categoryService.getAll().subscribe({
      next: res => {
        this.dataSource.data = res;
      } 
    })
  }
  delete(row: Category){
    const dialogRef = this.dialogService.open(DialogConfirm, {
      data: {name: row.name, object: "categoria"},
      
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){

     }
    });
  }
  
}
