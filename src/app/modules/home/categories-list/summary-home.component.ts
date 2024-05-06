
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Inject, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Category, Movement, SummaryHome } from '../../../models/models';
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
import { MovementService } from '../../../services/movement.service';

@Component({
  selector: 'app-summary-home',
  templateUrl: './summary-home.component.html',
  styleUrls: ['./summary-home.component.scss'],
  standalone: true,
  imports: [MatListModule, NgFor, NgIf,MatButtonModule, MatTableModule, MatIconModule, MatDialogModule ]
})
export default class SummaryHomeComponent implements OnInit {
  movementService = inject(MovementService);
  dataSourceService = inject(DataSourceService);
  public dialogService = inject(MatDialog);
  dataTable$: Subject<Movement[]> = new Subject();
  date = new Date();
  list: SummaryHome[];
  listCategories: Item[];
  listTypes: Item[];
  images: Item[];
  dataSource = new MatTableDataSource<SummaryHome>();
  displayedColumns: string[] = ['category', 'amount', 'type'];

  ngOnInit(): void {
    this.dataSourceService.getAllCategories().subscribe({
      next: res =>{
      this.listCategories = res;
      }
    })
    this.dataSourceService.getTypes().subscribe({
      next: res =>{
      this.listTypes = res;
      }
    })
    this.getMovements();
    this.loadData();  
     
  }
  getMovements(){
    this.dataTable$.pipe(
      switchMap(() =>{ return  this.movementService.getByMonth(this.date.getMonth(), this.date.getFullYear())})
    ).subscribe(res  =>  {
      const list = res.sort((a,b) => a.categoryKey.localeCompare(b.categoryKey));
      let category = '';
      list.forEach(element => {
       if(category == ''){
        category = element.categoryKey;
        let newItem: SummaryHome = {
          category: this.listCategories.find(x => x.key == element.categoryKey)?.description as string,
          amount: 0,

        };
       }
       if(category == element.categoryKey){

       }
      });
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
