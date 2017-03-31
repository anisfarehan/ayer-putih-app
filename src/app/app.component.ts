import {Component, ViewChild} from '@angular/core';
/*import {
 Push,
 PushToken
 } from '@ionic/cloud-angular';*/

import {Events, MenuController, Nav, Platform} from 'ionic-angular';

import {Storage} from '@ionic/storage';



import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Auth } from '@ionic/cloud-angular';
import {AkaunPage} from '../pages/akaun/akaun';
import {PrestasiPage} from "../pages/prestasi/prestasi";
import {AktivitPage} from "../pages/aktivit/aktivit";
import {DetailcikguPage} from "../pages/detailcikgu/detailcikgu";

//import { ContactPage } from '../pages/contact/contact';

@Component({
  templateUrl: 'app.template.html'
})
export class MyApp {
  rootPage:any;
  @ViewChild(Nav) nav:Nav;


  constructor(platform: Platform, public auth:Auth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      if(this.auth.isAuthenticated()) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }

    });
    }
  openAkaun() {
    this.nav.setRoot(AkaunPage);
  }
  openHome() {
    this.nav.setRoot(HomePage);
  }
  openPrestasi() {
    this.nav.setRoot(PrestasiPage);
  }
  openAktivit(){
    this.nav.setRoot(AktivitPage);
  }
  openDetailcikgu(){
    this.nav.setRoot(DetailcikguPage)
  }



}