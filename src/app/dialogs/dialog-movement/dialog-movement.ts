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
import { Movement } from '../../models/models';
import { MovementService } from '../../services/movement.service';
import { DialogConfirm } from '../confirm/dialog-confirm';
export interface DialogData {
    list: Item[];
    listType: Item[];
    categorySelected: string;
    amout: number;
    due: number;
    title: string;
    movement?: Movement;
    editable: boolean;
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
    public dialogService = inject(MatDialog);
    public movementService = inject(MovementService);
    list: Item[]; 
    listType: Item[]; 
    title: string;
    selectedImage: Item;
    movement: Movement;
    editable: boolean = false;
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
        this.editable = data.editable;   
        if(data.movement){
          this.movement = data.movement;
          this.formGroup.controls.category.setValue(this.movement.categoryKey);
          this.formGroup.controls.description.setValue(this.movement.description);
          this.formGroup.controls.amount.setValue(this.movement.amount.toString());
          this.formGroup.controls.type.setValue(this.movement.typeKey);
          if(this.movement.dueKey != ''){
            const dueValue = this.movement.due?.countDues.toString() as string;
            this.formGroup.controls.due.setValue(dueValue);
          }
        }   
       
    }
   delete(){
    const dialogRef = this.dialogService.open(DialogConfirm, {
      data: {name:'', object: "movimiento"},
      
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      this.movementService.delete(this.movement.key).subscribe(() =>  this.dialogRef.close('delete'));
     
           
     }
    });
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