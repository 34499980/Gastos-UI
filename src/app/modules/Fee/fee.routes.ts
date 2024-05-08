import { Route } from "@angular/router";
import { AppRoutePaths } from "../../enums/path.enums";
import { CategoriesResolver } from "../../resolver/categories.resolver";
import { TypesResolver } from "../../resolver/types.resolver";
import FeeComponent from "./fee.component";

const feeRoutes: Route[] = [
    {
        path: `${AppRoutePaths.FEE}`,     
        component: FeeComponent,
        resolve: {
            types: TypesResolver,
            categories: CategoriesResolver
        }
      
    }
];
export default feeRoutes;
