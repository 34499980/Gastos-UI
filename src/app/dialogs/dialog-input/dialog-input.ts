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
    name: string;
    title: string;
  }
  
@Component({
    selector: 'dialog-input',
    templateUrl: 'dialog-input.html',
    styleUrls: ['./dialog-input.scss'],
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
  export class DialogInput {   
    title: string;   
    formGroup = new FormBuilder().group({   
    name: ['', Validators.required]
  });
    public dialogRef = inject(MatDialogRef<DialogData>);
    constructor(    
      @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    ) {        
        this.title = data.title;
      
       
    }   
    cancel(): void {
      this.dialogRef.close(false);
    }
    accept(){
      this.dialogRef.close(this.formGroup.controls.name.value);
    }
  }