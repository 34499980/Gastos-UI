import { Route } from "@angular/router";
import { AppRoutePaths } from "../../enums/path.enums";
import { CategoriesResolver } from "../../resolver/categories.resolver";
import { TypesResolver } from "../../resolver/types.resolver";
import SummaryByMonthComponent from "./byMonth/summary-month.component";

const summaryRoutes: Route[] = [
    {
        path: `${AppRoutePaths.BYMONTH}`,     
        component: SummaryByMonthComponent,
        resolve: {
            types: TypesResolver,
            categories: CategoriesResolver
        }
        //loadComponent: ()=> import('app/modules/Categories/categories-list/categories-list.component'),
      
    }
];
export default summaryRoutes;
