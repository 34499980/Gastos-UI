
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Inject, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap, filter, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DueService } from '../../services/due.service';
import { Due, SummaryByYear } from '../../models/models';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss'],
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

export default class FeeComponent implements OnInit {
  dueService = inject(DueService);
  route = inject(ActivatedRoute);
  dataTable$: Subject<Due[]> = new Subject();
  date = new Date();
  list: Due[] = [];
  listCategories: Item[];
  dataSource = new MatTableDataSource<Due>();
 
  displayedColumns: string[] = ['category', 'description', 'amount','count' ,'date'];

  ngOnInit(): void {
    this.listCategories = this.route.snapshot.data['categories'];
    this.getSummary();
   
  }
 
 
  getSummary(){
    this.dueService.getAll().subscribe({
      next: res =>{
        res.forEach(element => {
          const newItem: Due = {
            countDues: element.due?.countDues as string,
            totalAmount: element.due?.totalAmount  as number,
            amount: element.due?.amount,            
            date: `${element.month}/${element.year}`,
            actualCount: element.due?.actualCount,
            category: this.listCategories.find(x => x.key == element.categoryKey)?.description,
            description: element.description
          }
          this.list.push(newItem);
         });
       // this.list = this.list.sort((a,b) => b.countDues.localeCompare(a.countDues));
        this.dataSource.data =  this.list;
      } 
    });
       
  }  
 
 
}
