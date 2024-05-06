
import { Observable } from "rxjs";
import { Item } from "../models/item.model";
import { ConfigsLoaderService } from "./config-loader.service";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Category } from "../models/models";

@Injectable({
    providedIn: 'root'
  })
  export class DataSourceService {
    private apiEndpoint = '';
    headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    constructor(
        private httpClient: HttpClient,
        private config: ConfigsLoaderService,
      ) {
        this.apiEndpoint = this.config.apiUrl;
      }

    
  public getAllCategories(): Observable<Item[]> {   
    return this.httpClient.get<Item[]>(`${this.apiEndpoint}/DataSource/getCategories`)
  }
  public getImages(): Observable<Item[]> {   
    return this.httpClient.get<Item[]>(`${this.apiEndpoint}/DataSource/getImages`)
  }
  public getTypes(): Observable<Item[]> {   
    return this.httpClient.get<Item[]>(`${this.apiEndpoint}/DataSource/getTypes`)
  }
  }