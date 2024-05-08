

import { Route } from '@angular/router';
import { AppRoutePaths } from './enums/path.enums';
import categoryRoutes from './modules/Categories/category.routes';

export const appRoutes: Route[] = [
  {
    
    path: AppRoutePaths.CATEGORY,
    loadChildren: ()=> import('../app/modules/Categories/category.routes')
  
  },
  {
    
    path: '',
    loadChildren: ()=> import('../app/modules/home/home.routes')
  
  }
  ,
  {
    
    path: AppRoutePaths.SUMMARY,
    loadChildren: ()=> import('../app/modules/summary/summary.routes')
  
  },
  {
    
    path: AppRoutePaths.FEE,
    loadChildren: ()=> import('../app/modules/fee/fee.routes')
  
  }
];


