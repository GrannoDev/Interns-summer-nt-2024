import { provideHttpClient, withFetch } from '@angular/common/http'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { AppComponent } from './app/app.component'
import { routes } from './app/app.routes'

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err))
