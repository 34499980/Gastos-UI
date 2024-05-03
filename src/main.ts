import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { AppModule } from './app/app.module';


platformBrowserDynamic(
  [{ provide: appConfig, useValue: appConfig }]
).bootstrapModule(AppModule)
  .catch(err => console.error(err));