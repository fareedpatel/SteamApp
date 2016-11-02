import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';

import {SignInPage} from './pages/sign-in/sign-in';

import {
  FIREBASE_PROVIDERS, defaultFirebase,
  AngularFire, firebaseAuthConfig, AuthProviders,
  AuthMethods
} from 'angularfire2';

import {AppUser} from './providers/app-user/app-user';

const firebaseConfig = {
  apiKey: 'AIzaSyC8VNM0ULk6uG1vfpepJ9CxgqeQWcxt1hw',
  authDomain: 'steamdemo-8c203.firebaseapp.com',
  databaseURL: 'https://steamdemo-8c203.firebaseio.com',
  storageBucket: 'steamdemo-8c203.appspot.com',
  messagingSenderId: '290283305225',
};

/**
 *
 *
 * @export
 * @class MyApp
 * @version 0.5
 */
@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(
    private platform: Platform,
    public af: AngularFire) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  ngOnInit() {

    this.af.auth.subscribe((data) => {
      if (data) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = SignInPage;
      }
    });
  }
}

ionicBootstrap(MyApp, [
  FIREBASE_PROVIDERS, AppUser,
  // Initialize Firebase app
  defaultFirebase(firebaseConfig),
  firebaseAuthConfig({
    provider: AuthProviders.Password,
    method: AuthMethods.Password,
    remember: 'default',
    scope: ['email']
  })
]);
