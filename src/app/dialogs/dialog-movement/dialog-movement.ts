import {Component, inject, Inject} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Item } from '../../models/item.model';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
export interface DialogData {
    list: Item[];
    listType: Item[];
    categorySelected: string;
    amout: number;
    due: number;
    title: string;
  }
  
@Component({
    selector: 'dialog-movement',
    templateUrl: 'dialog-movement.html',
    styleUrls: ['./dialog-movement.scss'],
    standalone: true,
    imports: [ FormsModule,        
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        CommonModule,
        NgFor,
        NgIf,MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatSelectModule,
        MatIconModule, ]
  })
  export class DialogMovement {
    list: Item[]; 
    listType: Item[]; 
    title: string;
    selectedImage: Item;
    formGroup = new FormBuilder().group({
    category: ['', Validators.required],
    description: ['', Validators.required],
    amount: ['', Validators.required],
    type: ['', Validators.required],
    due: ['']

  });
    public dialogRef = inject(MatDialogRef<DialogData>);
    constructor(    
      @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    ) {
        this.list = data.list;
        this.listType = data.listType;
        this.title = data.title;       
       
    }
   
    cancel(): void {
      this.dialogRef.close(false);
    }
    accept(){
      this.dialogRef.close({
        category: this.formGroup.controls.category.value,
        amount: this.formGroup.controls.amount.value,
        type: this.formGroup.controls.type.value,
        due: this.formGroup.controls.due.value,
        description: this.formGroup.controls.description.value
      });
    }
  }