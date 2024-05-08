import {Component, inject} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
import { Item } from '../../../models/item.model';
import { Movement, SummaryHome, Due } from '../../../models/models';
import { DataSourceService } from '../../../services/dataSource.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovementService } from '../../../services/movement.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { DialogMovement } from '../../../dialogs/dialog-movement/dialog-movement';
import { Types } from '../../../enums/type.enums';

@Component({
  selector: 'summary-home',
  styleUrls: ['summary-home.component.scss'],
  templateUrl: 'summary-home.component.html',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    CommonModule,NgStyle, MatDialogModule ,MatTableModule, MatButtonModule, MatIconModule, NgFor,MatDividerModule, MatListModule
  ]
})
export default class SummaryHomeComponent {
  movementService = inject(MovementService);
  dataSourceService = inject(DataSourceService);
  route = inject(ActivatedRoute);
  public dialogService = inject(MatDialog);

  dataTable$: Subject<Movement[]> = new Subject();
  date = new Date();
  newItem: SummaryHome;
  newDue: Due;
  list: SummaryHome[] = [];
  listCategories: Item[];
  listTypes: Item[];
  images: Item[];
  dataSource = new MatTableDataSource<SummaryHome>();
  columnsToDisplay: string[] = ['Categoria', 'Monto', 'Tipo'];
  expandedElement: SummaryHome | null;
  salary: number = 0;
  buys: number = 0;
  rest: number = 0;

  ngOnInit(): void {
    this.listCategories = this.route.snapshot.data['categories'];
    this.listTypes = this.route.snapshot.data['types'];
    
    this.getMovements();
    this.loadData();  
    
  }
  restValidation(){
   return this.salary - this.buys < 1? true: false;
  }
  getMovements(){
    this.dataTable$.pipe(
      switchMap(() =>{ 
        const month = this.date.getMonth().toString();
        const year =  this.date.getFullYear().toString();
        return  this.movementService.getByMonth(month, year)
      })
    ).subscribe(res  =>  {
      const listResp = res.sort((a,b) => b.categoryKey.localeCompare(a.categoryKey));
      let category = '';
      let index = 0;
      const end = listResp.length;
      while(index < end){
        let movementList: Movement[] = [];
        if(category != listResp[index].categoryKey){
          this.newItem = this.createNewItem(listResp[index], category)
          category = listResp[index].categoryKey;
        }
        while(index < end && category == listResp[index].categoryKey){
          this.newItem.Monto += listResp[index].amount;
          movementList.push(listResp[index])
          if(Types.INPUT == listResp[index].typeKey){
            this.salary += listResp[index].amount;
          } else {
            this.buys += listResp[index].amount;
          }
          index++;
        }
        this.newItem.movement = movementList;
        this.list.push(this.newItem);
      }    
      this.dataSource.data = this.list;
    })
  }
  createDue(amount: number, due: number): Due{
    const newDue: Due = {
      totalAmount: amount,
      countDues: due
      }
      return newDue;
  }
  createNewItem(element: Movement, category: string):SummaryHome{
    category = element.categoryKey;
  const newItem : SummaryHome = {
      Categoria: this.listCategories.find(x => x.key == element.categoryKey)?.description as string,
      Monto: 0,
      Tipo: this.listTypes.find(x => x.key == element.typeKey)?.description as string
    };
    return newItem;
  }
  loadData(){
    this.newDue = {} as any ; 
    this.newItem = {} as any ;   
    this.list = [];
    this.dataSource.data = [];
    this.dataTable$.next([]);
  }
  add(){
    const dialogRef = this.dialogService.open(DialogMovement, {
      data: {list: this.listCategories,
             title: "Ingresar movimiento",
            listType : this.listTypes},
      
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      const date = new Date();     
      if(result.due > 0){
        this.newDue = this.createDue(result.amount, result.due);
      }
      const input: Movement = {
        amount: result.amount,
        categoryKey: result.category,
        createdDate: '',
        createdBy: 'system',
        description: result.description,
        dueBool: result.due > 0? true: false,
        dueKey: '',
        key: '',
        modifiedDate: '',
        typeKey: result.type,
        due: result.due > 0? this.newDue: undefined,
        month: date.getMonth(),
        year: date.getFullYear()


      }
      this.movementService.add(input).subscribe({
        next: res => {
          this.loadData()
        } 
      })
     }
    });
  }
  delete(key: string){
    this.movementService.delete(key).subscribe({
      next: res => {
        this.loadData()
      } 
    })
  }
}
