
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Inject, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Category, Movement, SummaryByMonth } from '../../../models/models';
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
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DialogMovement } from '../../../dialogs/dialog-movement/dialog-movement';

@Component({
  selector: 'app-summary-month',
  templateUrl: './summary-month.component.html',
  styleUrls: ['./summary-month.component.scss'],
  standalone: true,
  imports: [MatListModule,
    MatSelectModule,
    FormsModule, 
    MatFormFieldModule,
    CommonModule, 
    DatePipe,
     NgFor,
      NgIf,
      MatButtonModule,
       MatTableModule,
        MatIconModule,
         MatDialogModule,
         ReactiveFormsModule,
         MatInputModule  ]
})

export default class SummaryByMonthComponent implements OnInit {
  movementService = inject(MovementService);
  dataSourceService = inject(DataSourceService);
  public dialogService = inject(MatDialog);
  route = inject(ActivatedRoute);
  dataTable$: Subject<SummaryByMonth[]> = new Subject();
  listCategories: Item[];
  listTypes: Item[];
  date = new Date();
  list: SummaryByMonth[] = [];
  listFilter: SummaryByMonth[] = [];
  listMovement: Movement[] = [];
  dataSource = new MatTableDataSource<SummaryByMonth>();
  formGroup = new FormBuilder().group({
    month: ['', Validators.required],
    year:  ['', Validators.required],
    category: ['']
  });
   months = ['1','2','3','4','5','6','7','8','9','10','11','12'
   
  ]
  displayedColumns: string[] = ['category', 'description', 'type', 'amount', 'date'];

  ngOnInit(): void {
    this.formGroup.controls.month.setValue((this.date.getMonth()+1).toString());
    this.formGroup.controls.year.setValue(this.date.getFullYear().toString());
    this.listCategories = this.route.snapshot.data['categories'];
    this.listTypes = this.route.snapshot.data['types'];
    this.getSummary();
    this.loadData();
    this.formGroup.controls.category.valueChanges.subscribe(val => {
      if(val == '' || val == undefined || val == null){
        this.dataSource.data = this.list;
      } else {
        const value = val as string;
        const listFiler = this.list.filter(x => x.category.toLowerCase().includes(value.toLowerCase()));
        this.dataSource.data = listFiler;
      }
    
    });
   
  }
  search(){
    if(!this.formGroup.invalid){
      this.loadData();
    }
  }
  generateDto(list: SummaryByMonth[]){

  }
  getSummary(){
    this.dataTable$.pipe(
      switchMap(() =>{ 
        const month = this.formGroup.controls.month.value?? '';
        const year = this.formGroup.controls.year.value?? '';
        return  this.movementService.getByMonth(month, year)
      })
    ).subscribe(res  =>  {
      this.listMovement = res;
      const list = res.sort((a,b) => b.createdDate.localeCompare(a.createdDate));
      list.forEach(element => {
        const newItem: SummaryByMonth = {
          key : element.key,
          amount: element.amount,
          category: this.listCategories.find(x => x.key == element.categoryKey)?.description as string,
          image: this.listCategories.find(x => x.key == element.categoryKey)?.image as string,
          date: element.createdDate,
          description: element.description,
          type: this.listTypes.find(x => x.key == element.typeKey)?.description as string,
          due: element.due
        }
        this.list.push(newItem);
      });
      console.log(this.list)
      this.dataSource.data = this.list;
    
    })
  }
  loadData(){
    this.list = [];
    this.dataTable$.next([]);
  }
  delete(row: Category){
    const dialogRef = this.dialogService.open(DialogConfirm, {
      data: {name: row.name, object: "movimiento"},
      
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      this.movementService.delete(row.key).subscribe({
        next: res => {
          this.loadData()
        } 
      })      
     }
    });
  }
  edit(row: SummaryByMonth){
    const movement = this.listMovement.find(x => x.key == row.key)
    const dialogRef = this.dialogService.open(DialogMovement, {
      data: {list: this.listCategories,
             title: "Editar movimiento",
            listType : this.listTypes,
            movement: movement,
            editable: true
          },
           
      
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      if(result != 'delete'){
        const date = new Date();     
     
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
          due: result.due,
          month: movement?.month as number,
          year: movement?.year as number
  
  
        }
        this.movementService.edit(input).subscribe({
          next: res => {
            this.loadData()
          } 
        })
      } else {
        this.loadData();
      }
    
     }
    });
  }
 
}
