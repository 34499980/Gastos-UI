
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
import { DialogInput } from '../../dialogs/dialog-input/dialog-input';
import { ImageService } from '../../services/image.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
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
         MatInputModule,
           ]
})

export default class SettingsComponent implements OnInit {
  public dialogService = inject(MatDialog);
  imageService = inject(ImageService);
  constructor( ){

  }
  ngOnInit(): void {
  
   
  }
 
  addImageCategory(){
    const dialogRef = this.dialogService.open(DialogInput, {
      data: {
             title: "Ingresar imagen"
            },
      
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      const input: Item = {
        key: '',
        description: result
      }
      this.imageService.add(input).subscribe(() => {
      
      });
     }
    });
  }
 
 
 
}
