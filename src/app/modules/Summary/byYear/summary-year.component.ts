
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Inject, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Category, Movement, SummaryByMonth, SummaryByYear } from '../../../models/models';
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
  selector: 'app-summary-year',
  templateUrl: './summary-year.component.html',
  styleUrls: ['./summary-year.component.scss'],
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

export default class SummaryByYearComponent implements OnInit {
  movementService = inject(MovementService);
  route = inject(ActivatedRoute);
  dataTable$: Subject<SummaryByYear[]> = new Subject();
  date = new Date();
  list: SummaryByYear[] = [];
  dataSource = new MatTableDataSource<SummaryByYear>();
 
  displayedColumns: string[] = ['salary', 'buy', 'rest', 'date'];

  ngOnInit(): void {
   
    this.getSummary();
   
  }
 
 
  getSummary(){
    this.movementService.getAllTotals().subscribe({
      next: res =>{
        res.forEach(element => {
          const newItem: SummaryByYear = {
            balance: element.balance,
            buy: element.buy,
            input: element.input,
            date:`${element.month}/${element.year}`,
            month: element.month,
            year: element.year
          }
          this.list.push(newItem);
         });
        this.list = this.list.sort((a,b) => b.date.localeCompare(a.date));
        this.dataSource.data =  this.list;
      } 
    });
       
  }  
 
 
}
