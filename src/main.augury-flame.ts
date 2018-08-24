import { NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

declare const Augury: any;

setTimeout(() => {
  const ngZone = new NgZone({});

  Augury.init({
    observe: {
      Promise,
      ngZone,
      ngModule: AppModule
    }
  });

  Augury.watchApp(
    platformBrowserDynamic()
      .bootstrapModule(AppModule, { ngZone })
  );
}, 2000);
