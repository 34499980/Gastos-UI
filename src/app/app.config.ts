import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, APP_INITIALIZER, inject } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app-routes";
import { ConfigsLoaderService } from "./services/config-loader.service";


export const appConfig: ApplicationConfig = {
    providers: [
       
        provideHttpClient(),
        provideAnimations(),
        provideRouter(appRoutes),
        {   // load config and other initial data
            provide   : APP_INITIALIZER,
            useFactory: () =>
            {
                const configLoaderService = inject(ConfigsLoaderService);
               // const langService = inject(LanguageService);
                return ()=> new Promise<void>(async resolve => {
                    await configLoaderService.loadConfigs();
                   
                    resolve();     
                });
            },
            multi     : true,
        }
    ]
}