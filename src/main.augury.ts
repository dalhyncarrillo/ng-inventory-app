import { NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { auguryBootstrap } from '/Users/andrew/Code/rangle/augury-labs/packages/core';
import { PopoutZoneMonitor } from '/Users/andrew/Code/rangle/augury-labs/packages/plugins/popout-timeline';

auguryBootstrap({
  platform: platformBrowserDynamic,
  ngModule: AppModule,
  NgZone,
  plugins: [
    new PopoutZoneMonitor(),
  ]
});
