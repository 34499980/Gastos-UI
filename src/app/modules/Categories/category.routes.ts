import { Route } from "@angular/router";
import { AppRoutePaths } from "../../enums/path.enums";
import CategoriesListComponent from "./categories-list/categories-list.component";

const categoryRoutes: Route[] = [
    {
        path: `${AppRoutePaths.CATEGORIESLIST}`,     
        component: CategoriesListComponent
        //loadComponent: ()=> import('app/modules/Categories/categories-list/categories-list.component'),
      
    }
];
export default categoryRoutes;
