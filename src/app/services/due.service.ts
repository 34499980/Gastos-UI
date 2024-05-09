
import { Observable } from "rxjs";
import { Item } from "../models/item.model";
import { ConfigsLoaderService } from "./config-loader.service";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Category, Movement, SummaryByYear } from "../models/models";

@Injectable({
    providedIn: 'root'
  })
  export class DueService {
    private apiEndpoint = '';
    headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    constructor(
        private httpClient: HttpClient,
        private config: ConfigsLoaderService,
      ) {
        this.apiEndpoint = this.config.apiUrl;
      }

    

  public getAll(): Observable<Movement[]> {   
      return this.httpClient.get<Movement[]>(`${this.apiEndpoint}/Due/getAllWithMovement`)
  }
  public processByMonth(): Observable<boolean> {   
    return this.httpClient.get<boolean>(`${this.apiEndpoint}/Due/processByMonth`)
}

  }