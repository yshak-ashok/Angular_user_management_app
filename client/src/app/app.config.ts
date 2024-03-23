import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserReducer } from './Store/User/user.reducers';
import { UserEffect } from './Store/User/user.effects';
import {  provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AppEffects } from './Store/Common/app.effects';
import { AssociateReducer } from './Store/Associate/associate.reducers';
import { AssociateEffect } from './Store/Associate/associate.effects';
import { authInterceptor } from './auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore({ user: UserReducer, associate: AssociateReducer }),
    provideEffects([UserEffect, AppEffects, AssociateEffect]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(),withInterceptors([authInterceptor])),
  ],

};


