
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../models/item.model";
import { ConfigsLoaderService } from "./config-loader.service";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

    
  public getAll(): Observable<Item[]> {   
    return this.httpClient.get<Item[]>(`${this.apiEndpoint}/Category/getAll`)
  }
  }