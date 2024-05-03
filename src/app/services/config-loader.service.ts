
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import packageJson from '../../../package.json';

@Injectable({
    providedIn: 'root'
  })
  export class ConfigsLoaderService {
    private httpClient: HttpClient;
    private config: Configs;
    get packageJson() {return packageJson}
    
    constructor(handler: HttpBackend) {
        this.httpClient = new HttpClient(handler);
      }
    get apiUrl() {
        return this.config.apiUrl;
    }
    public async loadConfigs(): Promise<void> {
        this.config = await firstValueFrom(this.httpClient.get<Configs>('config/config.json'));
    }    
  }

  export interface Configs {
    apiUrl: string;
  }