import { Route } from "@angular/router";
import { AppRoutePaths } from "../../enums/path.enums";
import { CategoriesResolver } from "../../resolver/categories.resolver";
import { TypesResolver } from "../../resolver/types.resolver";
import SummaryHomeComponent from "./home/summary-home.component";

const homeRoutes: Route[] = [
    {
        path: ``,     
        component: SummaryHomeComponent,
        resolve: {
            types: TypesResolver,
            categories: CategoriesResolver
        }
        //loadComponent: ()=> import('app/modules/Categories/categories-list/categories-list.component'),
      
    }
];
export default homeRoutes;
