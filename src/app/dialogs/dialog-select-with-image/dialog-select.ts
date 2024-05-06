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
    imageSelected: string;
    name: string;
    title: string;
  }
  
@Component({
    selector: 'dialog-select',
    templateUrl: 'dialog-select.html',
    styleUrls: ['./dialog-select.scss'],
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
  export class DialogSelect {
    list: Item[]; 
    title: string;
    selectedImage: Item;
    formGroup = new FormBuilder().group({
    image: ['', Validators.required],
    name: ['', Validators.required]
  });
    public dialogRef = inject(MatDialogRef<DialogData>);
    constructor(    
      @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    ) {
        this.list = data.list;
        this.title = data.title;
        if(data.imageSelected != ""){
          this.selectedImage = this.list.find(x => x.description == data.imageSelected) as Item;
          this.formGroup.controls.image.setValue(this.selectedImage.key);
          this.formGroup.controls.name.setValue(data.name);
        } else {
          this.selectedImage = this.list[0] as Item;
          this.formGroup.controls.image.setValue(this.selectedImage.key);
        }
       
    }
    onImageChange(value: string){
      this.formGroup.controls.image.setValue(value);
      this.selectedImage = this.list.find(x => x.key == value) as Item;
    }
    cancel(): void {
      this.dialogRef.close(false);
    }
    accept(){
      this.selectedImage = this.list.find(x => x.key == this.formGroup.controls.image.value) as Item;
      this.dialogRef.close({image:   this.selectedImage.description,
                            name:  this.formGroup.controls.name.value});
    }
  }