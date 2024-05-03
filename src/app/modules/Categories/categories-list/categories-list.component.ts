import { Component, Inject, OnInit } from '@angular/core';
import { CategryService } from '../../../services/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  standalone: true
})
export class CategoriesListComponent implements OnInit {
  categoryService = Inject(CategryService);
  ngOnInit(): void {
 /*   this.categoryService.getAll().subscribe({
      next: res => {
        console.log(res)
      } 
    })*/
  }

}
