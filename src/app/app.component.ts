import {Component, ViewChild} from '@angular/core';
import {Push, PushToken } from '@ionic/cloud-angular';

import {Push as FCMPush} from 'ionic-native';
import {Storage} from '@ionic/storage';
import {Events, MenuController, Nav, Platform, AlertController} from 'ionic-angular';


import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Auth } from '@ionic/cloud-angular';
import {AkaunPage} from '../pages/akaun/akaun';
import {PrestasiPage} from "../pages/prestasi/prestasi";
import {AktivitPage} from "../pages/aktivit/aktivit";
import {DetailcikguPage} from "../pages/detailcikgu/detailcikgu";

//import { ContactPage } from '../pages/contact/contact';

import {PushDataService} from '../providers/push-data-service';
import {TabsPage} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.template.html'
})
export class MyApp {
  rootPage:any;
  @ViewChild(Nav) nav:Nav;


  constructor(platform: Platform, public auth:Auth,
              public platform:Platform,
              public alertCtrl:AlertController,
              public pushData:PushDataService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      /*
       * Uncomment code below to enable FCM Push Notification
       * */
      this.initFCMPushNotification();

      if(this.auth.isAuthenticated()) {
        this.rootPage = HomePage;
        this.rootPage = AkaunPage;
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


  initFCMPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }
    let push = FCMPush.init({
      android: {
        senderID: "216103551307",
        topics: ['all']
      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      },
      windows: {}
    });

    push.on('registration', (responseData) => {
      //save device token into storage
      this.pushData.setDeviceToken(responseData.registrationId);
      // this.globalService.alert('Push Token', data.registrationId, data.registrationId).present();
      console.log("device token ->", responseData.registrationId);
      //TODO - send device token to server
      //NOTE: send device token after login
      this.pushData.updateGCMRegistrationId(responseData.registrationId).subscribe((success:any)=> {
        console.log(success);
      }, (error:any)=> {
        console.log(error);
      });

    });
    push.on('notification', (responseData) => {
      /*
       * Response format
       * {
       "sound": "default",
       "title": "Sg. Sembrong Status",
       "message": "River Depth: 40m",
       "additionalData": {
       "a_data": "my_data",
       "data":{
       "schedule":{
       "date":"2016-05-17",
       "group":{
       "time":"9:00 am",
       "session":{
       "name":"Sg.Sembrong @Batu 2",
       "timeStart":"8:00 am",
       "timeEnd":"9:00 am",
       "location":"Batu Pahat, Johor",
       "tracks":["Safe"]
       }
       }
       }
       }
       }
       "google.message_id": "0:1488983365818789%82fa97fe82fa97fe",
       "coldstart": "false",
       "collapse_key": "tech.cryptical.walm",
       "foreground": true
       }
       };
       * */
      console.log('message', responseData.message);
      // this.pushData.pushMsg(responseData.additionalData.data);

      //if user using app and push notification comes
      let self = this;
      if (responseData.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: responseData.title,
          message: responseData.message,
          subTitle: "",
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              self.nav.setRoot(TabsPage); // self.nav.push(SchedulePage);//, {message: responseData.additionalData.data.group.session});
            }
          }]
        });
        confirmAlert.present();
        //setInterval(confirmAlert.dismiss(), 1000 * 60);

        // load the channel data
        // this.chanData.load();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        self.nav.setRoot(TabsPage);// self.nav.push(SchedulePage);//, {message: responseData.additionalData.data.group.session});
        console.log("Push notification clicked");
      }
    });
    push.on('error', (e) => {
      console.log(e.message);
    });

    /*push.subscribe('sembrong', function () {
     this.globalService.alert("Success", "Subscription", "Sembrong");
     }, function () {
     this.globalService.alert("Failed", "Subscription", "Sembrong");
     });*/

  }

}
