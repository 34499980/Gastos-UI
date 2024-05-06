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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule, NgFor, NgIf } from '@angular/common';

export interface DialogData {
    name: string;
    object: string;
  }
  
@Component({
    selector: 'dialog-confirm',
    templateUrl: 'dialog-confirm.html',
    styleUrls: ['./dialog-confirm.scss'],
    standalone: true,
    imports: [ FormsModule,        
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        CommonModule,
        NgFor,
        NgIf ]
  })
  export class DialogConfirm {
    name: string;
    object: string;
    public dialogRef = inject(MatDialogRef<DialogData>);
    constructor(    
      @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    ) {
        this.object = data.object;
        this.name = data.name;
    }
  
    cancel(): void {
      this.dialogRef.close(false);
    }
    accept(){
      this.dialogRef.close(true);
    }
  }