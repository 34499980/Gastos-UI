

import { Route } from '@angular/router';
import { AppRoutePaths } from './enums/path.enums';
import categoryRoutes from './modules/Categories/category.routes';

export const appRoutes: Route[] = [
  {
    
    path: AppRoutePaths.CATEGORY,
    loadChildren: ()=> import('../app/modules/Categories/category.routes')
  
  }
];


