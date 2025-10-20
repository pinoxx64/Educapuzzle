// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { App} from './app/app';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideAnimations(),
    ...(appConfig.providers ?? [])
  ]
})
  .catch((err) => console.error(err));

