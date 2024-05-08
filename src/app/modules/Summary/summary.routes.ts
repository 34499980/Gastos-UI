import { Route } from "@angular/router";
import { AppRoutePaths } from "../../enums/path.enums";
import { CategoriesResolver } from "../../resolver/categories.resolver";
import { TypesResolver } from "../../resolver/types.resolver";
import SummaryByMonthComponent from "./byMonth/summary-month.component";
import SummaryByYearComponent from "./byYear/summary-year.component";

const summaryRoutes: Route[] = [
    {
        path: `${AppRoutePaths.BYMONTH}`,     
        component: SummaryByMonthComponent,
        resolve: {
            types: TypesResolver,
            categories: CategoriesResolver
        }
      
    },
    {
        path: `${AppRoutePaths.BYYEAR}`,     
        component: SummaryByYearComponent,
        
      
    }
];
export default summaryRoutes;
