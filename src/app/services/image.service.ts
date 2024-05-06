
import { Observable } from "rxjs";
import { Item } from "../models/item.model";
import { ConfigsLoaderService } from "./config-loader.service";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Category } from "../models/models";

@Injectable({
    providedIn: 'root'
  })
  export class ImageService {
    private apiEndpoint = '';
    headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    constructor(
        private httpClient: HttpClient,
        private config: ConfigsLoaderService,
      ) {
        this.apiEndpoint = this.config.apiUrl;
      }

    
  public add(item: Item): Observable<any> {   
    return this.httpClient.post<any>(`${this.apiEndpoint}/Image/add`, item)
    }
public edit(item: Item): Observable<any> {   
    return this.httpClient.post<any>(`${this.apiEndpoint}/Image/edit`, item)
    }
}