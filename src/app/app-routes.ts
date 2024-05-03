import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AppRoutePaths } from './enums/path.enums';
import categoryRoutes from './modules/Categories/category.routes';

export const appRoutes: Route[] = [
  {
    
    path: AppRoutePaths.CATEGORY,
    loadChildren: ()=> import('../app/modules/Categories/category.routes')
  
  }
];


