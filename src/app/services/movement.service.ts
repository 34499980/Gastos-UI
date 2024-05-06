
import { Observable } from "rxjs";
import { Item } from "../models/item.model";
import { ConfigsLoaderService } from "./config-loader.service";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Category, Movement } from "../models/models";

@Injectable({
    providedIn: 'root'
  })
  export class MovementService {
    private apiEndpoint = '';
    headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    constructor(
        private httpClient: HttpClient,
        private config: ConfigsLoaderService,
      ) {
        this.apiEndpoint = this.config.apiUrl;
      }

    
  public getByMonth(month: number, year: number): Observable<Movement[]> {   
    const params = new HttpParams();
    params.append('month', month)
    params.append('year', year)
    return this.httpClient.get<Movement[]>(`${this.apiEndpoint}/Movement/getByMonth`,{params})
  }
  public edit(input: Category): Observable<any> {   
    return this.httpClient.put<any>(`${this.apiEndpoint}/Movement/edit`, input)
  }
  public add(input: Category): Observable<any> {   
    return this.httpClient.post<any>(`${this.apiEndpoint}/Movement/add`, input)
  }
  public delete(input: string): Observable<any> {   
    return this.httpClient.delete<any>(`${this.apiEndpoint}/Movement/remove/${input}`)
  }
  }