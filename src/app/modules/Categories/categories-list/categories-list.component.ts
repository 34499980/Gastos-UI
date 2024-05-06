
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
import { DataSourceService } from '../../../services/dataSource.service';
import { Item } from '../../../models/item.model';
import { DialogSelect } from '../../../dialogs/dialog-select-with-image/dialog-select';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap, filter, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  standalone: true,
  imports: [MatListModule, NgFor, NgIf,MatButtonModule, MatTableModule, MatIconModule, MatDialogModule ]
})
export default class CategoriesListComponent implements OnInit {
  categoryService = inject(CategryService);
  dataSourceService = inject(DataSourceService);
  public dialogService = inject(MatDialog);
  dataTable$: Subject<Category[]> = new Subject();
  list: Category[];
  images: Item[];
  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['image', 'name', 'actions'];

  ngOnInit(): void {
    this.getCagetories();
    this.loadData();
    this.dataSourceService.getImages().subscribe({
      next: res => {
        this.images = res;
      } 
    })
  }
  getCagetories(){
    this.dataTable$.pipe(
      switchMap(() =>{ return  this.categoryService.getAll()})
    ).subscribe(res  =>  {
      this.dataSource.data = res;
    })
  }
  loadData(){
    this.dataTable$.next([]);
  }
  delete(row: Category){
    const dialogRef = this.dialogService.open(DialogConfirm, {
      data: {name: row.name, object: "categoria"},
      
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      this.categoryService.delete(row.key).subscribe({
        next: res => {
          this.loadData()
        } 
      })      
     }
    });
  }
  edit(row: Category){
    const dialogRef = this.dialogService.open(DialogSelect, {
      data: {list: this.images,
             imageSelected: row.image,
             name: row.name,
             title: 'Editar categoria'
            },
      
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      const input: Category ={
        key: row.key,
        image: result.image,
        name: result.name,
        createdDate: row.createdDate
        
      }
      this.categoryService.edit(input).subscribe({
        next: res => {
          this.loadData()
        } 
      })
     }
    });
  }
  add(){
    const dialogRef = this.dialogService.open(DialogSelect, {
      data: {list: this.images,
             imageSelected: '',
             name: '',
             title: 'Crear categoria'
            },
      
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      const date = new Date();
      const input: Category ={
        key: '',
        image: result.image,
        name: result.name,
        createdDate: ''
        
      }
      this.categoryService.add(input).subscribe({
        next: res => {
          this.loadData()
        } 
      })
     }
    });
  }
}
