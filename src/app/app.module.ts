import {NgModule, Component} from '@angular/core';
import {SQLite} from 'ionic-native';

import {IonicApp, IonicModule, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AkaunPage} from '../pages/akaun/akaun';
import {LoginPage} from '../pages/login/login';
import {TabsPage} from '../pages/tabs/tabs';
import {SupportPage} from '../pages/support/support';

import {GlobalService} from '../providers/global-service';
import {AuthService} from '../providers/auth-service';
import {ChannelData} from '../providers/channel-data';
import {UserData} from '../providers/user-data';
import {PushDataService} from '../providers/push-data-service';
import {SQLiteService} from '../providers/sql-lite-service';

import {CloudSettings, CloudModule, Auth} from '@ionic/cloud-angular';
import {ContactPage} from "../pages/contact/contact";
import {HomePage} from '../pages/home/home';
import {PrestasiPage} from "../pages/prestasi/prestasi";
import {MyApp} from './app.component';
import {AktivitPage} from "../pages/aktivit/aktivit";
import {DetailcikguPage} from "../pages/detailcikgu/detailcikgu";
//import {WalmApp} from './app.component';
/*
 import {AboutPage} from '../pages/about/about';
 import {PopoverPage} from '../pages/about-popover/about-popover';

 import {MapPage} from '../pages/map/map';
 import {SchedulePage} from '../pages/schedule/schedule';
 import {ScheduleFilterPage} from '../pages/schedule-filter/schedule-filter';
 import {SessionDetailPage} from '../pages/session-detail/session-detail';
 import {SignupPage} from '../pages/signup/signup';
 import {SpeakerDetailPage} from '../pages/speaker-detail/speaker-detail';
 import {SpeakerListPage} from '../pages/speaker-list/speaker-list';

 import {TutorialPage} from '../pages/tutorial/tutorial';*/


const cloudSettings:CloudSettings = {
  'core': {
    'app_id': '71dc6e5b'
  },
  'push': {
    'sender_id': '642527413379',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};


@NgModule({
  declarations: [
    AkaunPage,
    LoginPage,
    SupportPage,
    ContactPage,
    TabsPage,
    MyApp,
    HomePage,
    PrestasiPage,
    AktivitPage,
    DetailcikguPage,
    //WalmApp,
    /*AboutPage,

     MapPage,
     PopoverPage,
     SchedulePage,
     ScheduleFilterPage,
     SessionDetailPage,
     SignupPage,
     SpeakerDetailPage,
     SpeakerListPage,

     TutorialPage,*/

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AkaunPage,
    LoginPage,
    SupportPage,
    ContactPage,
    TabsPage,
    MyApp,
    HomePage,
    PrestasiPage,
    AktivitPage,
    DetailcikguPage,
    //WalmApp,
    /*AboutPage,

     MapPage,
     PopoverPage,
     SchedulePage,
     ScheduleFilterPage,
     SessionDetailPage,
     SignupPage,
     SpeakerDetailPage,
     SpeakerListPage,

     TutorialPage,*/

  ],
  providers: [GlobalService, AuthService, ChannelData, UserData, PushDataService,
    SQLiteService, SQLite, Storage]
})
export class AppModule {

}
