import { APP_INITIALIZER, inject } from "@angular/core";
import { ApplicationConfig } from "@angular/platform-browser";
import { ConfigsLoaderService } from "./services/config-loader.service";

export const appConfig: ApplicationConfig = {
    providers: [
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