import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataSourceService } from "../services/dataSource.service";

@Injectable({
    providedIn: 'root' // or specific module
  })
// tslint:disable-next-line: no-any
export class CategoriesResolver {
    constructor(
        private service: DataSourceService
    ) {
    }

    // tslint:disable-next-line: no-any
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.service.getAllCategories();
    }
}
