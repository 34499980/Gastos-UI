
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
import { ActivatedRoute } from '@angular/router';

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
  route = inject(ActivatedRoute);
  dataTable$: Subject<Movement[]> = new Subject();
  date = new Date();
  newItem: SummaryHome;
  list: SummaryHome[] = [];
  listCategories: Item[];
  listTypes: Item[];
  images: Item[];
  dataSource = new MatTableDataSource<SummaryHome>();
  displayedColumns: string[] = ['category', 'amount', 'type'];
 
  ngOnInit(): void {
    this.listCategories = this.route.snapshot.data['categories'];
    this.listTypes = this.route.snapshot.data['types'];
    
    this.getMovements();
    this.loadData();  
     
  }
  getMovements(){
    this.dataTable$.pipe(
      switchMap(() =>{ return  this.movementService.getByMonth(7,2023/*this.date.getMonth(), this.date.getFullYear()*/)})
    ).subscribe(res  =>  {
      const listResp = res.sort((a,b) => a.categoryKey.localeCompare(b.categoryKey));
      let category = '';
      let index = 0;
      const end = listResp.length;
      while(index < end){
        if(category != listResp[index].categoryKey){
          this.newItem = this.createNewItem(listResp[index], category)
          category = listResp[index].categoryKey;
         }
         while(index < end && category == listResp[index].categoryKey){
          this.newItem.amount += listResp[index].amount;
          index++;
         }
         this.list.push(this.newItem);
      }    
      this.dataSource.data = this.list;
    })
  }
  createNewItem(element: Movement, category: string):SummaryHome{
    category = element.categoryKey;
   const newItem : SummaryHome = {
      category: this.listCategories.find(x => x.key == element.categoryKey)?.description as string,
      amount: 0,
      type: this.listTypes.find(x => x.key == element.typeKey)?.description as string
    };
    return newItem;
  }
  loadData(){
    this.dataTable$.next([]);
  }
  delete(row: Category){
    
  }
  edit(row: Category){
   
  }
  add(){
  
  }
}
