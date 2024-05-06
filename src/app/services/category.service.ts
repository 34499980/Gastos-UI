
import { Observable } from "rxjs";
import { Item } from "../models/item.model";
import { ConfigsLoaderService } from "./config-loader.service";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Category } from "../models/models";

@Injectable({
    providedIn: 'root'
  })
  export class CategryService {
    private apiEndpoint = '';
    headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    constructor(
        private httpClient: HttpClient,
        private config: ConfigsLoaderService,
      ) {
        this.apiEndpoint = this.config.apiUrl;
      }

    
  public getAll(): Observable<Category[]> {   
    return this.httpClient.get<Category[]>(`${this.apiEndpoint}/Category/getAll`)
  }
  public edit(input: Category): Observable<any> {   
    return this.httpClient.put<any>(`${this.apiEndpoint}/Category/edit`, input)
  }
  public add(input: Category): Observable<any> {   
    return this.httpClient.post<any>(`${this.apiEndpoint}/Category/add`, input)
  }
  public delete(input: string): Observable<any> {   
    return this.httpClient.delete<any>(`${this.apiEndpoint}/Category/remove/${input}`)
  }
  }