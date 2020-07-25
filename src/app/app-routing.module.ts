import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard, OKTA_CONFIG
} from '@okta/okta-angular';

import {LoginComponent} from './components/login/login.component';
import {ProtectedComponent} from './components/protected/protected.component';

const config = {
  issuer: 'https://dev-705417.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oamyk8y5gH9rgLTv4x6',
  pkce: true
};

const routes: Routes = [
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    }
  }
];

export function onAuthRequired({ oktaAuth, router }) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);

}

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: config }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
