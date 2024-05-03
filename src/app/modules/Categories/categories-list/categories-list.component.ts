
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Inject, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Category } from '../../../models/models';
import { CategryService } from '../../../services/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  standalone: true,
  imports: [MatListModule, NgFor, NgIf]
})
export default class CategoriesListComponent implements OnInit {
  categoryService = inject(CategryService);
  list: Category[];
  ngOnInit(): void {
    console.log('Entra')
    this.categoryService.getAll().subscribe({
      next: res => {
        this.list = res;
        console.log(res)
      } 
    })
  }

}
