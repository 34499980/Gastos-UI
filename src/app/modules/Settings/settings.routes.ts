import { Route } from "@angular/router";
import { AppRoutePaths } from "../../enums/path.enums";
import { CategoriesResolver } from "../../resolver/categories.resolver";
import { TypesResolver } from "../../resolver/types.resolver";
import SettingsComponent from "./settings.component";

const settingsRoutes: Route[] = [
    {
        path: `${AppRoutePaths.SETTINGS}`,       
        component: SettingsComponent,
     
      
    }
];
export default settingsRoutes;
