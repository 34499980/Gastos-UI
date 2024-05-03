import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import categoryRoutes from './modules/Categories/category.routes';

const routes: Routes = [...categoryRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
