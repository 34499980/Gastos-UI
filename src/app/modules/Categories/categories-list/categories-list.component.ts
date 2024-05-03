
import { Component, OnInit, Inject, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CategryService } from '../../../services/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  standalone: true,
  imports: [MatSidenavModule,]
})
export default class CategoriesListComponent implements OnInit {
  categoryService = inject(CategryService);

  ngOnInit(): void {
    console.log('Entra')
    this.categoryService.getAll().subscribe({
      next: res => {
        console.log(res)
      } 
    })
  }

}
